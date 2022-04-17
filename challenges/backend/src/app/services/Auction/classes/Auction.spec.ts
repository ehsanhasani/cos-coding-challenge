import { expect } from "chai";
import { Auction } from "./Auction";

describe('Auction', () => {
    const id = 1;
    it('Auction initialize', () => {
        const auction = new Auction();
        auction.id = id;
        expect(auction).is.instanceOf(Auction);
        expect(auction.id).equal(id);
    });
   
});