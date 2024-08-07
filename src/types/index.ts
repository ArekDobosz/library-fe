export enum BooksOrderBy {
  Author = "author",
  CreatedAt = "createdAt",
  Pages = "pages",
  Rating = "rating",
  Title = "title",
}

export enum Order {
  Asc = "asc",
  Desc = "desc",
}

export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Conflict = 409,
  InternalServerError = 500,
}

export type HttpResponse<T> = {
  message?: string;
  statusCode?: HttpStatusCode;
} & T;

export interface Author {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: Author;
  isbn: string;
  pages: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export type PaginationResult<T> = {
  data: T[];
  nextToken?: string;
  prevToken?: string;
};

export interface OptionType<OType extends number | string = string> {
  label: string;
  value: OType;
}

export interface CreateAuthorForm {
  name?: string;
}

export interface CreateBookForm {
  title?: string;
  authorId?: string;
  isbn?: string;
  pages?: number | string;
  rating?: number | string;
}

export interface SearchParams {
  search?: string;
  nextToken?: string;
  prevToken?: string;
}

export interface MainPageProps {
  searchParams?: SearchParams;
}
