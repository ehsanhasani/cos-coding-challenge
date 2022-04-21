import { expect } from "chai";
import { AuctionFilter } from "./AuctionFilter";

describe.only("AuctionFilter", () => {
  const limit = 2;
  const offset = 2;

  it("Get Filter Query", () => {
    const instance = AuctionFilter.getInstance();
    instance.setLimit(limit);
    instance.setOffset(offset);
    const result = JSON.parse(instance.getFilterQuery());
    expect(result.limit).equal(limit);
    expect(result.offset).equal(offset);
  });

  it("Get Filter Query for next page and current page is 1", () => {
    const instance = AuctionFilter.getInstance();
    const result = instance.nextPage(1);
    console.log(result);
    expect(instance.getOffset()).equal(instance.getLimit());
    expect(result).contains('{"limit":10,"offset":10}');
  });

  it("Get Filter Query for next page", () => {
    const instance = AuctionFilter.getInstance();
    const result = instance.nextPage(2);
    console.log(result);
    expect(instance.getOffset()).equal(instance.getLimit() * 2);
    expect(result).contains('{"limit":10,"offset":20}');
  });

  it("Get Query String should contain filter & count", () => {
    const instance = AuctionFilter.getInstance();
    const result = instance.getQueryString();

    expect(result.includes("filter")).equal(true);
    expect(result.includes("count")).equal(true);
  });
});
