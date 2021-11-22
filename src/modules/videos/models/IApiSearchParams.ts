export interface IApiSearchParams {
  s: string;
  y?: string;
  type?: "movie" | "series" | "episode";
  page: string;
}
