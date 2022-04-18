import { IAuction } from "./IAuction";

export interface IAuctionCollection {
  setItems(value: any): void;
  getItems(): IAuction[];
  setPage(value: number): void;
  getPage(): number;
  setTotal(value: number): void;
  getTotal(): number;
  length: number;
}
