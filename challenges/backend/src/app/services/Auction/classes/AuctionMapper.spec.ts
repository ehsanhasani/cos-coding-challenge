import { expect } from "chai";
import { Auction } from "./Auction";
import { AuctionMapper } from "./AuctionMapper";

describe('AuctionMapper', () => {

    const items = [
        {
            "id": 18252,
            "label": "Maybach Alfa 146",
            "endingTime": "2022-04-18T10:08:57.980Z",
            "state": 2,
            "minimumRequiredAsk": 10420,
            "currentHighestBidValue": 253,
            "numBids": 0,
        }
    ]
    
    it('Map function should create array of Auction instance', () => {
        const result = AuctionMapper.map(items);
        expect(result).is.instanceOf(Array);
        expect(result[0]).is.instanceOf(Auction);
        expect(result[0].id).equal(items[0].id);
        expect(result[0].label).equal(items[0].label);
        expect(result[0].endingTime).equal(items[0].endingTime);
        expect(result[0].state).equal(items[0].state);
        expect(result[0].minimumRequiredAsk).equal(items[0].minimumRequiredAsk);
        expect(result[0].currentHighestBidValue).equal(items[0].currentHighestBidValue);
        expect(result[0].numBids).equal(items[0].numBids);
        expect(result[0].createdAt).equal(undefined);
    });
   
});