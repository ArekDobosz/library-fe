"use client";

import { useCallback, useMemo, useState } from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Grid,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAuthorFormValidation } from "./validation";
import {
  FormTextField,
  FormSelectField,
  FormRatingField,
} from "@/components/Form";
import { Author, CreateBookForm } from "@/types";
import { createBook } from "@/api/book";
import { isApiError, mapApiErrorMessage } from "@/utils";

export const AddBook = ({ authors }: { authors: Author[] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authorsOptions = useMemo(
    () =>
      authors?.map((author) => ({
        label: author.name,
        value: author.id,
      })) ?? [],
    [authors]
  );

  const form = useForm<CreateBookForm>({
    defaultValues: {
      title: "",
      authorId: "",
      isbn: "",
      pages: "",
      rating: 2.5,
    },
    resolver: yupResolver(createAuthorFormValidation(authorsOptions)),
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = form;

  const handleClose = useCallback(() => {
    setErrorMessage("");
    setIsDialogOpen(false);
    reset();
  }, [reset]);

  const onSubmit = useCallback(
    async (formData: CreateBookForm) => {
      setErrorMessage("");
      const bookResponse = await createBook(formData);
      if (isApiError(bookResponse)) {
        setErrorMessage(mapApiErrorMessage(bookResponse?.message));
        return;
      }
      handleClose();
    },
    [handleClose]
  );

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        onClick={() => setIsDialogOpen(true)}
        disabled={!authors || !authors.length}>
        <AddIcon sx={{ mr: 2 }} /> Add Book
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <Container maxWidth="sm" sx={{ py: 4 }}>
          <DialogTitle sx={{ minWidth: 360 }}>Add Book</DialogTitle>
          <DialogContent>
            <FormProvider {...form}>
              <form onSubmit={handleSubmit(onSubmit)} id="add-book-form">
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item md={12}>
                    <FormTextField
                      control={control}
                      id="book-name"
                      name="title"
                      label="Title"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <FormSelectField
                      id="author-select"
                      name="authorId"
                      label="Author"
                      control={control}
                      options={authorsOptions}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FormTextField
                      control={control}
                      id="isbn"
                      name="isbn"
                      label="ISBN Number"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <FormTextField
                      control={control}
                      id="pages"
                      name="pages"
                      type="number"
                      label="Number of pages"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <FormRatingField
                      control={control}
                      id="rating"
                      name="rating"
                      label="Rating"
                    />
                  </Grid>
                </Grid>
                {errorMessage && (
                  <Alert severity="error">
                    Could not add author. {errorMessage}
                  </Alert>
                )}
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="warning">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" disabled={!isValid}>
                    Add
                  </Button>
                </DialogActions>
              </form>
            </FormProvider>
          </DialogContent>
        </Container>
      </Dialog>
    </>
  );
};
