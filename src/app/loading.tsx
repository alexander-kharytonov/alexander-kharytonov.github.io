"use client";

import { LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <LinearProgress
      variant="query"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    />
  );
}
