import { expect } from "chai";
import { AuctionCollection } from "../../Auction";
import { CalculateCarOnSaleJson } from "./CalculateCarOnSaleJson";

describe('CalculateCarOnSaleJson', () => {
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

    it('Calculate the result', async () => {
        const collection = AuctionCollection.getInstance(input);
        const instance = CalculateCarOnSaleJson.getInstance();
        const result = JSON.parse(instance.calculate(collection));
        expect(result.totalAuctions).equal(input.total);
        expect(result.averageBids).equal(0);
        expect(result.averageBidsRatio).equal(+(collection.getItems()[0].bidRatio / 1).toFixed(2));
    });
    
});