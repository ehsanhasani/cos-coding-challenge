import { injectable } from "inversify";
import "reflect-metadata";
import { IAuctionCollection } from "../../Auction";
import { ICarOnSaleCalculation } from "../interface/ICarOnSaleCalculation";

@injectable()
export class CalculateCarOnSaleJson implements ICarOnSaleCalculation {
    public calculate(auctions: IAuctionCollection): string {
        const result = {
            totalAuctions: auctions.getTotal(),
            averageBids: this.calculateAverageBids(auctions),
            averageBidsRatio: this.calculateBidsRatio(auctions)
        };

        return JSON.stringify(result);
    }

    private calculateAverageBids(auctions: IAuctionCollection): number {
        let value = auctions.getItems().reduce((sum, current) => sum + current.numBids, 0);
        let averageBids = value / auctions.length;
        return +averageBids.toFixed(2);
    }

    private calculateBidsRatio(auctions: IAuctionCollection): number {
        let value = auctions.getItems().reduce((sum, current) => sum + current.bidRatio, 0);
        let averageBidsRatio = value / auctions.length;
        return +averageBidsRatio.toFixed(2);
    }

    public static getInstance() {
        return new CalculateCarOnSaleJson();
    }

}