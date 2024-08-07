"use client";

import { useForm } from "react-hook-form";

import { useSearchParams, usePathname, useRouter } from "next/navigation";

import Button from "@mui/material/Button";

import SearchIcon from "@mui/icons-material/Search";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchForm, searchFormValidation } from "./validation";
import { useCallback } from "react";
import { Grid } from "@mui/material";
import { FormTextField } from "@/components/Form";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const form = useForm<SearchForm>({
    defaultValues: { search: searchParams.get("search")?.toString() ?? "" },
    resolver: yupResolver(searchFormValidation),
  });

  const { control, handleSubmit } = form;

  const onSubmit = useCallback(
    ({ search }: SearchForm) => {
      const params = new URLSearchParams(searchParams);
      params.delete("nextToken");
      params.delete("prevToken");
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item md={10}>
          <FormTextField
            id="search"
            name="search"
            label="Search"
            placeholder="Search"
            adornment={<SearchIcon />}
            control={control}
          />
        </Grid>
        <Grid item md={2}>
          <Button
            type="submit"
            variant="outlined"
            size="large"
            sx={{ height: 56 }}
            fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
