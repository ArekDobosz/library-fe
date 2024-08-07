import { HttpResponse, HttpStatusCode } from "@/types";

export const isApiError = (data: HttpResponse<unknown> | undefined) =>
  (data?.statusCode &&
    [
      HttpStatusCode.InternalServerError,
      HttpStatusCode.Conflict,
      HttpStatusCode.BadRequest,
    ].includes(data.statusCode)) ||
  !data;

export const mapApiErrorMessage = (message?: string): string => {
  if (!message) return "Unexpected error.";

  if (message.indexOf("[P2002]") > -1)
    return "A record with a specific name/title already exists.";

  return message;
};
