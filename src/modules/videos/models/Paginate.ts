export interface Paginate<T> {
  results: T[];
  previousPage: number | null;
  nextPage: number | null;
  totalPages: number;
}
