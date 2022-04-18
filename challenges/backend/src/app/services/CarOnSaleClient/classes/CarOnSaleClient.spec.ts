import axios from "axios";
import { expect } from "chai";
import sinon from "sinon";
import { AuctionCollection } from "../../Auction";
import { Authentication } from "../../Authentication/classes/Authentication";
import { CarOnSaleClient } from "./CarOnSaleClient";

describe("CarOnSaleClient", () => {
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

  const auth = new Authentication();
  auth.getAuthenticationHeader = () => {
    return {
      authtoken: "FOO",
      userid: "BAR",
    };
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    sandbox.restore();
  });

  it("GetRunningAuctions return collection instance", async () => {
    const resolved = new Promise((r) => r({ data: input }));
    sandbox.stub(axios, "get").returns(resolved);
    const instance = new CarOnSaleClient();
    const result = await instance.getRunningAuctions(auth);
    expect(result).is.instanceOf(AuctionCollection);
    expect(result.length).eq(input.items.length);
  });
});
