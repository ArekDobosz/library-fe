"use server";

import { revalidatePath } from "next/cache";

import { Author, HttpResponse } from "@/types";
import { Api } from "./api";

export const createAuthor = async (
  name: string
): Promise<HttpResponse<Author> | undefined> => {
  const author = await Api.createAuthor(name);
  if (author?.id) {
    revalidatePath("/");
  }
  return author;
};
