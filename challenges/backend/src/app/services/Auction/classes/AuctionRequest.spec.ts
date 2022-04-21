import { expect } from "chai";
import { AuctionFilter } from "./AuctionFilter";
import { AuctionRequest } from "./AuctionRequest";

describe("AuctionRequest", () => {
  it("initialize AuctionRequest", () => {
    const url = "";
    const filter = new AuctionFilter();
    const headers = {};
    const instance = new AuctionRequest(url, filter, headers);
    expect(instance).instanceOf(AuctionRequest);
  });
});
