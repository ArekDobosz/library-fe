import { object, string } from "yup";
import { CreateAuthorForm } from "@/types";

const minNameLength = 3;
const maxNameLength = 50;

export const createAuthorFormValidation = object<CreateAuthorForm>({
  name: string()
    .required("Name is required")
    .min(minNameLength, `The minimum character length is ${minNameLength}`)
    .max(maxNameLength, `The maximum character length is ${maxNameLength}`),
});
