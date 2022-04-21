import { IAuctionFilter } from "../interfaces/IAuctionFilter";

export class AuctionFilter implements IAuctionFilter {
  private _limit = 10;
  private _offset = 0;
  private _count = false;

  public getLimit(): number {
    return this._limit;
  }
  public setLimit(value: number) {
    this._limit = value;
  }

  public getOffset(): number {
    return this._offset;
  }
  public setOffset(value: number) {
    this._offset = value;
  }

  setCount(value: boolean): void {
    this._count = value;
  }
  getCount(): boolean {
    return this._count;
  }

  public getFilterQuery(): string {
    const filter: any = {};

    if (this.getLimit()) {
      filter["limit"] = this.getLimit();
    }

    if (this.getOffset()) {
      filter["offset"] = this.getOffset();
    }

    return JSON.stringify(filter);
  }

  public getQueryString(): string {
    return `?filter=${this.getFilterQuery()}&count=${this.getCount()}`;
  }

  public nextPage(currentPage: number): string {
    this.setOffset(currentPage * this.getLimit());

    return this.getQueryString();
  }

  public static getInstance(): IAuctionFilter {
    return new AuctionFilter();
  }
}
