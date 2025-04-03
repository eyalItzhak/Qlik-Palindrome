export interface ExtendPaginationResponse<T> extends BasePaginationResponse<T> {
    currentPage: number;
    totalItems: number;
    totalPages: number;
    hasMore: boolean;
  }

export interface BasePaginationResponse<T> {
  data: T[];
}
