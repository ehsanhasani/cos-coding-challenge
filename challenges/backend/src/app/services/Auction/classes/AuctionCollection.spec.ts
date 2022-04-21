import axios from "axios";
import { expect } from "chai";
import sinon from "sinon";
import { Auction } from "./Auction";
import { AuctionCollection } from "./AuctionCollection";
import { AuctionFilter } from "./AuctionFilter";
import { AuctionRequest } from "./AuctionRequest";

describe("AuctionCollection", () => {
  let sandbox: any;
  const input = {
    items: [
      {
        id: 18252,
        label: "Maybach Alfa 146",
        endingTime: "2022-04-18T10:08:57.980Z",
        state: 2,
        minimumRequiredAsk: 10420,
        currentHighestBidValue: 253,
        numBids: 0,
      },
    ],
    page: 1,
    total: 1,
  };

  const input2 = {
    items: [
      {
        id: 18252,
        label: "Maybach Alfa 146",
        endingTime: "2022-04-18T10:08:57.980Z",
        state: 2,
        minimumRequiredAsk: 10420,
        currentHighestBidValue: 253,
        numBids: 0,
      },
    ],
    page: 1,
    total: 2,
  };

  const input3 = {
    items: [
      {
        id: 18252,
        label: "Maybach Alfa 146",
        endingTime: "2022-04-18T10:08:57.980Z",
        state: 2,
        minimumRequiredAsk: 10420,
        currentHighestBidValue: 253,
        numBids: 0,
      },
    ],
    page: 2,
    total: 2,
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("Initialize collection and get instance", () => {
    const instance = AuctionCollection.getInstance(input);
    expect(instance).is.instanceOf(AuctionCollection);
    expect(instance.getPage()).equal(input.page);
    expect(instance.getTotal()).equal(input.total);
    expect(instance.length).equal(input.items.length);
  });

  it("Initialize collection and pass aution request and get instance", () => {
    const auctionRequest = new AuctionRequest("", new AuctionFilter(), {});
    const instance = AuctionCollection.getInstance(input, auctionRequest);
    expect(instance).is.instanceOf(AuctionCollection);
    expect(instance.getPage()).equal(input.page);
    expect(instance.getTotal()).equal(input.total);
    expect(instance.length).equal(input.items.length);
  });

  it("Initialize collection and check has iterator", () => {
    const instance = AuctionCollection.getInstance(input);
    for (const item of instance) {
      expect(item).is.instanceOf(Auction);
    }
  });

  it("Initialize collection and check has async iterator", async () => {
    const resolved = new Promise((r) => r({ data: input3 }));
    sandbox.stub(axios, "get").returns(resolved);
    const filter = new AuctionFilter();
    filter.setLimit(1);
    const auctionRequest = new AuctionRequest("", filter, {});
    const instance = AuctionCollection.getInstance(input2, auctionRequest);
    const items: Auction[] = [];
    for await (const item of instance) {
      items.push(item);
    }
    expect(items).length(input2.total);
  });
});
