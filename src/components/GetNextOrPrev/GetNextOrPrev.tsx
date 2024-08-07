"use client";

import { IconButton, Typography } from "@mui/material";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useCallback } from "react";

interface Props {
  token?: string;
  prev?: boolean;
}

export const GetNextOrPrev = ({ token, prev }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const handleNextClick = useCallback(() => {
    if (!token) return;
    const params = new URLSearchParams(searchParams);
    if (prev) {
      params.delete("nextToken");
      params.set("prevToken", token);
    } else {
      params.delete("prevToken");
      params.set("nextToken", token);
    }
    push(`${pathname}?${params.toString()}`);
  }, [token, prev, pathname, push, searchParams]);

  return (
    <Typography color={!token ? "text.disabled" : "text.primary"}>
      {!prev && "Next page"}
      <IconButton onClick={handleNextClick} disabled={!token} sx={{ mx: 1 }}>
        {prev ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
      </IconButton>
      {prev && "Previous page"}
    </Typography>
  );
};
