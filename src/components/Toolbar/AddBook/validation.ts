import { CreateBookForm, OptionType } from "@/types";
import { number, object, string } from "yup";

const minNameLength = 3;
const maxNameLength = 50;
const isbnReqex = /^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\d-]+$/;

export const createAuthorFormValidation = (authors: OptionType[]) =>
  object<CreateBookForm>({
    title: string()
      .required("Name is required")
      .min(minNameLength, `The minimum character length is ${minNameLength}`)
      .max(maxNameLength, `The maximum character length is ${maxNameLength}`),
    authorId: string()
      .required("Author is required")
      .oneOf(authors.map(({ value }) => value)),
    isbn: string()
      .required("ISBN number is required")
      .test("isValidIsbn", "ISBN is not valid", (value) =>
        isbnReqex.test(value)
      ),
    pages: number()
      .transform((value) => value ?? 0)
      .required("Number of pages is required")
      .max(10_000)
      .min(1, "Please provide value more than 0")
      .typeError("A number is required"),
    // jak nie ma wartości pokazuje błąd
    rating: number().required("Rating is required").max(5).min(0.5),
  });
