import axios from "axios";
import { IAuction } from "../interfaces/IAuction";
import { IAuctionCollection } from "../interfaces/IAuctionCollection";
import { AuctionMapper } from "./AuctionMapper";
import { AuctionRequest } from "./AuctionRequest";

export class AuctionCollection implements IAuctionCollection {
  private _items: IAuction[] = [];
  private _page: number;
  private _total: number;
  private _auctionRequest: AuctionRequest;

  public setItems(value: any) {
    this._items = AuctionMapper.map(value);
  }

  public getItems(): IAuction[] {
    return this._items;
  }

  public setPage(value: any) {
    this._page = value;
  }

  public getPage(): number {
    return this._page;
  }

  public setTotal(value: any) {
    this._total = value;
  }

  public getTotal(): number {
    return this._total;
  }

  public setAuctionRequest(value: AuctionRequest) {
    this._auctionRequest = value;
  }

  public getAuctionRequest(): AuctionRequest {
    return this._auctionRequest;
  }

  public get length(): number {
    return this._items.length;
  }

  public hasNextPage(): boolean {
    const totalPage = Math.ceil(
      this.getTotal() / this.getAuctionRequest().filter.getLimit()
    );
    return totalPage > this.getPage();
  }

  *[Symbol.iterator]() {
    for (const item of this._items) {
      yield item;
    }
  }

  async *[Symbol.asyncIterator]() {
    for (const item of this._items) {
      yield item;
    }

    while (this.hasNextPage()) {
      const result = await axios.get(
        `${
          this.getAuctionRequest().url
        }${this.getAuctionRequest().filter.nextPage(this.getPage())}`,
        {
          headers: this.getAuctionRequest().headers,
        }
      );

      this.setItems(result.data.items);
      this.setPage(result.data.page);
      this.setTotal(result.data.total);

      for (const item of this._items) {
        yield item;
      }
    }
  }

  public static getInstance(raw: any, auctionRequest?: AuctionRequest) {
    const instance = new AuctionCollection();
    instance.setItems(raw.items);
    instance.setPage(raw.page);
    instance.setTotal(raw.total);

    if (auctionRequest) {
      instance.setAuctionRequest(auctionRequest);
    }

    return instance;
  }
}
