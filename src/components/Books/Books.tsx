import { BooksOrderBy, Order } from "@/types";
import { Box, Grid, Paper, Rating, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { SectionHeader } from "../SectionHeader";
import { TruncateTypography } from "../TruncateTypography";
import { Api } from "@/api";
import { SearchParams } from "@/types";
import { GetNextOrPrev } from "../GetNextOrPrev";
import { isApiError } from "@/utils";

export async function Books({ search, nextToken, prevToken }: SearchParams) {
  const booksResponse = await Api.getBooks(
    BooksOrderBy.CreatedAt,
    Order.Asc,
    search,
    nextToken,
    prevToken
  );

  let books = booksResponse?.data ?? [];
  if (isApiError(booksResponse)) {
    books = [];
  }

  return (
    <Box>
      <SectionHeader title="Books" />
      {books?.map((book) => (
        <Paper key={book.id} elevation={3} sx={{ my: 1 }}>
          <Grid container sx={{ py: 2 }}>
            <Grid item container md={8} spacing={1} sx={{ pr: 2 }}>
              <Grid
                item
                md={2}
                display="flex"
                justifyContent="flex-end"
                alignItems="center">
                <Typography align="right">
                  <MenuBookIcon />
                </Typography>
              </Grid>
              <Grid
                item
                md={10}
                display="flex"
                justifyContent="center"
                alignItems="flex-start"
                flexDirection="column">
                <TruncateTypography variant="body2">
                  title: <strong>{book.title}</strong>
                </TruncateTypography>
                <TruncateTypography variant="body2">
                  author: <strong>{book.author.name}</strong>
                </TruncateTypography>
                <Typography variant="body2">
                  isbn: <strong>{book.isbn}</strong>
                </Typography>
              </Grid>
            </Grid>
            <Grid item md={4} alignItems="center">
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}>
                rating: <Rating value={book.rating} precision={0.5} readOnly />
              </Typography>
              <Grid item container sx={{ margin: 0 }}>
                <Grid item>
                  <Typography variant="body2">
                    number of pages: {book.pages}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
      <Box pt={2} display="flex" justifyContent="space-between">
        <GetNextOrPrev token={booksResponse?.prevToken} prev />
        <GetNextOrPrev token={booksResponse?.nextToken} />
      </Box>
    </Box>
  );
}
