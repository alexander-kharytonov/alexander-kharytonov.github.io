"use client";

import { Card, styled } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.quest.main,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  boxShadow: "none",
}));

export default StyledCard;
