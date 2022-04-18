import { expect } from "chai";
import { AuctionFilter } from "./AuctionFilter";


describe('AuctionFilter', () => {
    const limit = 2;
    const offset = 2;
    
    it.only('Get Filter Query', () => {
        const instance = AuctionFilter.getInstance();
        instance.setLimit(limit);
        instance.setOffset(offset);
        const result = JSON.parse(instance.getFilterQuery());
        expect(result.limit).equal(limit);
        expect(result.offset).equal(offset);
    });
    
    it('Get Filter Query for next page', () => {
        const instance = AuctionFilter.getInstance();
        const result = JSON.parse(instance.nextPage(2));

        expect(result.offset).equal(result.limit);
    });
   
});