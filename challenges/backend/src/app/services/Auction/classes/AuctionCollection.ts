import { IAuction } from "../interfaces/IAuction";
import { IAuctionCollection } from "../interfaces/IAuctionCollection";
import { AuctionMapper } from "./AuctionMapper";

export class AuctionCollection implements IAuctionCollection {
  private _items: IAuction[] = [];
  private _page: number;
  private _total: number;

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

  public get length(): number {
    return this._items.length;
  }

  *[Symbol.iterator]() {
    for (const item of this._items) {
      yield item;
    }
  }

  public static getInstance(raw: any) {
    const instance = new AuctionCollection();
    instance.setItems(raw.items);
    instance.setPage(raw.page);
    instance.setTotal(raw.total);
    return instance;
  }
}
