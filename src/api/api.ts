import {
  BooksOrderBy,
  Order,
  PaginationResult,
  Book,
  Author,
  CreateBookForm,
  HttpResponse,
} from "@/types";

export class Api {
  private static defaultPageSize = "10";
  private static baseApiUrl =
    process.env.API_URL || process.env.NEXT_PUBLIC_API_URL;

  private static async get<T>(url: string): Promise<T | undefined> {
    try {
      const response = await fetch(`${this.baseApiUrl}/${url}`);
      return response.json() as unknown as T;
    } catch (error) {
      this.handleApiError(error);
      return undefined;
    }
  }

  private static async post<T>(
    url: string,
    data?: unknown
  ): Promise<HttpResponse<T> | undefined> {
    try {
      const response = await fetch(`${this.baseApiUrl}/${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        ...(data ? { body: JSON.stringify(data) } : {}),
      });
      return response.json() as unknown as HttpResponse<T>;
    } catch (error) {
      this.handleApiError(error);
      return undefined;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static handleApiError(_error: unknown) {
    // TODO: send details to error tracking tool
  }

  /**
   * Returns books based on search text
   * @param orderBy BooksOrderBy: The name of the property by which to sort, default createdAt
   * @param order Order: Sorting direction, default ascending
   * @param search string: Text by which the result will be filtered
   * @returns Books
   */
  static async getBooks(
    orderBy = BooksOrderBy.CreatedAt,
    order = Order.Asc,
    search?: string,
    nextToken?: string,
    prevToken?: string
  ): Promise<HttpResponse<PaginationResult<Book>> | undefined> {
    try {
      const searchParams = new URLSearchParams();
      searchParams.append("orderBy", orderBy);
      searchParams.append("order", order);
      searchParams.append("size", this.defaultPageSize);
      if (search) {
        searchParams.append("search", search);
      }

      if (nextToken) {
        searchParams.append("nextToken", nextToken);
      }

      if (prevToken) {
        searchParams.append("prevToken", prevToken);
      }

      return this.get<HttpResponse<PaginationResult<Book>>>(
        `books?${searchParams.toString()}`
      );
    } catch {
      return { data: [] };
    }
  }

  static async createBook(
    data: CreateBookForm
  ): Promise<HttpResponse<Book> | undefined> {
    try {
      return this.post<HttpResponse<Book>>("books", data);
    } catch (error) {
      this.handleApiError(error);
      return undefined;
    }
  }

  /**
   * Returns all added authors
   * @returns Author
   */
  static async getAuthors(): Promise<HttpResponse<Author[]> | undefined> {
    try {
      return this.get<HttpResponse<Author[]>>("authors");
    } catch {
      return [];
    }
  }

  /**
   * Creates author for given data
   * @param name string
   * @returns Author
   */
  static async createAuthor(
    name: string
  ): Promise<HttpResponse<Author> | undefined> {
    try {
      return this.post<Author>("authors", { name });
    } catch (error) {
      this.handleApiError(error);
      return undefined;
    }
  }
}
