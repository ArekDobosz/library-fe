import { object, string } from "yup";

const maxSearchLength = 50;

export interface SearchForm {
  search?: string;
}

export const searchFormValidation = object<SearchForm>({
  search: string()
    .max(maxSearchLength, `The maximum character length is ${maxSearchLength}`)
    .optional(),
});
