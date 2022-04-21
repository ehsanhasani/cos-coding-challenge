import { IAuctionFilter } from "../interfaces/IAuctionFilter";

export class AuctionRequest {
  constructor(
    readonly url: string,
    readonly filter: IAuctionFilter,
    readonly headers: any
  ) {}
}
