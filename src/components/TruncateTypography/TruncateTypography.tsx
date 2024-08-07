import Typography, { TypographyProps } from "@mui/material/Typography";

export const TruncateTypography = (props: Omit<TypographyProps, "sx">) => {
  return (
    <Typography
      sx={{
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "100%",
      }}
      {...props}
    />
  );
};
