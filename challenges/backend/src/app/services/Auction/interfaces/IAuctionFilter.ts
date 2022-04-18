export interface IAuctionFilter {
  setLimit(value: number): void;
  getLimit(): number;
  setOffset(value: number): void;
  getOffset(): number;
  setCount(value: boolean): void;
  getCount(): boolean;
  getFilterQuery(): string;
  nextPage(currentPage: number): string;
  getQueryString(): string;
}
