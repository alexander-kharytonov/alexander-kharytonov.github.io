"use client";

import _ from "lodash";
import { Address } from "viem";
import { useAccount, useDisconnect } from "wagmi";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { enqueueSnackbar } from "notistack";
import { User, getUser, signUser } from "lib/data-layer/users";

export enum DISPATCH_ACTIONS {
  UPDATE_USER_DATA = "UPDATE_USER_DATA",
  RESET = "RESET",
}

const INITIAL_STATE: User = {
  id: null,
  completedQuestIDs: [],
  completedTasksIDs: [],
  points: 0,
};

export const UserContext = createContext({
  ...INITIAL_STATE,
  updateUser: () => {},
  reset: () => {},
});

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (_.isUndefined(context)) {
    throw new Error("Context must be used within a Provider");
  }

  return context;
};

function reducer(
  state: User,
  action: {
    type: DISPATCH_ACTIONS;
    payload?: any;
  }
) {
  const { type, payload } = action;

  switch (type) {
    case DISPATCH_ACTIONS.UPDATE_USER_DATA:
      return { ...state, ...payload };
    case DISPATCH_ACTIONS.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export function UserProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  const { disconnect } = useDisconnect();
  const { address: walletAddress } = useAccount();
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    async function signIn(walletAddress: Address) {
      try {
        dispatch({
          type: DISPATCH_ACTIONS.UPDATE_USER_DATA,
          payload: await signUser({ walletAddress }),
        });
      } catch (error) {
        if (error instanceof Error) {
          enqueueSnackbar(error.message, { variant: "error" });
        }

        disconnect();
      }
    }

    if (walletAddress) {
      signIn(walletAddress);
    } else {
      dispatch({ type: DISPATCH_ACTIONS.RESET });
    }
  }, [disconnect, walletAddress]);

  const updateUser = useCallback(async () => {
    try {
      if (walletAddress) {
        dispatch({
          type: DISPATCH_ACTIONS.UPDATE_USER_DATA,
          payload: await getUser({ walletAddress }),
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    }
  }, [walletAddress]);

  const value = useMemo(
    () => ({
      ...state,
      updateUser,
      reset: () => {
        dispatch({ type: DISPATCH_ACTIONS.RESET });
      },
    }),
    [state, updateUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
