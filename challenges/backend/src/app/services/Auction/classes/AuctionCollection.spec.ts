import { expect } from "chai";
import { Auction } from "./Auction";
import { AuctionCollection } from "./AuctionCollection";

describe('AuctionCollection', () => {

    const input = {
        items: [
            {
                "id": 18252,
                "label": "Maybach Alfa 146",
                "endingTime": "2022-04-18T10:08:57.980Z",
                "state": 2,
                "minimumRequiredAsk": 10420,
                "currentHighestBidValue": 253,
                "numBids": 0,
            }
        ],
        page: 1,
        total: 1
    }
    
    it('Initialize collection and get instance', () => {
        const instance = AuctionCollection.getInstance(input);
        expect(instance).is.instanceOf(AuctionCollection);
        expect(instance.getPage()).equal(input.page);
        expect(instance.getTotal()).equal(input.total);
        expect(instance.length).equal(input.items.length);
    });
    
    it('Initialize collection and check has iterator', () => {
        const instance = AuctionCollection.getInstance(input);
        for (let item of instance) {
            expect(item).is.instanceOf(Auction);
        }
    });
   
});