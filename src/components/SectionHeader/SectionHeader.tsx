import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}
export const SectionHeader = ({ title }: Props) => {
  return (
    <Box mb={2}>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Divider orientation="horizontal" />
    </Box>
  );
};
