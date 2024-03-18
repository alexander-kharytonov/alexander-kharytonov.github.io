import { IconButton } from "@mui/material";
import {
  Brightness7 as Brightness7Icon,
  Brightness4 as Brightness4Icon,
} from "@mui/icons-material";
import { useThemeContext } from "lib/providers/mui.providers";

export default function ModeSwitcher(): React.ReactElement {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
