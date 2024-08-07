"use server";

import Grid from "@mui/material/Grid";
import { AddAuthor } from "./AddAuthor";
import { AddBook } from "./AddBook";
import { Api } from "@/api";
import { isApiError } from "@/utils";
import { Alert } from "@mui/material";

export const Toolbar = async () => {
  let authors = (await Api.getAuthors()) ?? [];
  let message: string | undefined;
  if (isApiError(authors)) {
    authors = [];
    message = authors?.message;
  }

  return (
    <Grid container spacing={3}>
      <Grid item md={3} sm={4}>
        <AddAuthor />
      </Grid>
      <Grid item md={3} sm={4}>
        <AddBook authors={authors} />
      </Grid>
      {message && (
        <Grid item md={12}>
          <Alert severity="error">{message}</Alert>
        </Grid>
      )}
    </Grid>
  );
};
