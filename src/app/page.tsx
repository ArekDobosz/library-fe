import { Suspense } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { Authors } from "@/components/Authors";
import { Books } from "@/components/Books";
import { Search } from "@/components/Search";
import { Toolbar } from "@/components/Toolbar";
import { MainPageProps } from "@/types";

export default function Home({ searchParams }: MainPageProps) {
  return (
    <Container
      sx={{
        width: "100%",
        zIndex: 100,
        padding: 3,
      }}>
      <Stack sx={{ background: "rgb(255,255,255)", padding: 4 }}>
        <Box pb={3}>
          <Search />
        </Box>
        <Box pb={3}>
          <Toolbar />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Suspense fallback={<CircularProgress />}>
              <Authors />
            </Suspense>
          </Grid>
          <Grid item xs={8}>
            <Suspense fallback={<CircularProgress />}>
              <Books {...searchParams} />
            </Suspense>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
