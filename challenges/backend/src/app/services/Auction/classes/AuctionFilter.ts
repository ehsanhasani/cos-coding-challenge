import { IAuctionFilter } from "../interfaces/IAuctionFilter";

export class AuctionFilter implements IAuctionFilter {

    private _limit: number = 50;
    private _offset: number = 0;
    private _count: boolean = false;

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
            filter['limit'] = this.getLimit();
        }

        if (this.getOffset()) {
            filter['offset'] = this.getLimit();
        }

        return JSON.stringify(filter);
    }

    public getQueryString(): string {
        return `?filter=${this.getFilterQuery()}&count=${this.getCount()}`;
    }

    public nextPage(currentPage: number): string {
        this.setOffset(currentPage - 1 * this.getLimit());

        return this.getFilterQuery();
    }

    public static getInstance(): IAuctionFilter {
        return new AuctionFilter();
    }
}