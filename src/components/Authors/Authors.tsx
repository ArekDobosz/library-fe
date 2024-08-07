import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

import { Api } from "@/api";

import { SectionHeader } from "../SectionHeader";
import { isApiError } from "@/utils";

export async function Authors() {
  let authors = (await Api.getAuthors()) ?? [];
  if (isApiError(authors)) {
    authors = [];
  }

  return (
    <Box>
      <SectionHeader title="Authors" />
      {authors.map((author) => (
        <Paper key={author.id} elevation={3} sx={{ p: 2, my: 1 }}>
          <Typography key={author.id} align="center">
            {author.name}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
}
