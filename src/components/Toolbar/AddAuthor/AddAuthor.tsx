"use client";

import { useCallback, useState } from "react";

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAuthorFormValidation } from "./validation";
import { FormTextField } from "@/components/Form";
import { createAuthor } from "@/api/author";
import { CreateAuthorForm } from "@/types";
import { isApiError, mapApiErrorMessage } from "@/utils";

export const AddAuthor = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<CreateAuthorForm>({
    defaultValues: { name: "" },
    resolver: yupResolver(createAuthorFormValidation),
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
    async ({ name }: CreateAuthorForm) => {
      setErrorMessage("");
      if (name) {
        const authorResponse = await createAuthor(name);
        if (isApiError(authorResponse)) {
          setErrorMessage(mapApiErrorMessage(authorResponse?.message));
          return;
        }
        handleClose();
      }
    },
    [handleClose]
  );

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        onClick={() => setIsDialogOpen(true)}>
        <PersonAddIcon sx={{ mr: 2 }} /> Add Author
      </Button>
      <Dialog open={isDialogOpen} onClose={handleClose}>
        <Container maxWidth="sm">
          <DialogTitle sx={{ minWidth: 360 }}>Add Author</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} id="add-author-form">
              <FormTextField
                control={control}
                id="author-name"
                name="name"
                label="Name"
                sx={{ mt: 1 }}
              />
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
          </DialogContent>
        </Container>
      </Dialog>
    </>
  );
};
