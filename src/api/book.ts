"use server";

import { revalidatePath } from "next/cache";

import { Book, CreateBookForm, HttpResponse } from "@/types";
import { Api } from "./api";

export const createBook = async (
  data: CreateBookForm
): Promise<HttpResponse<Book> | undefined> => {
  const book = await Api.createBook(data);
  if (book?.id) {
    revalidatePath("/");
  }
  return book;
};
