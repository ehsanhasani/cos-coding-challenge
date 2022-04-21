import { injectable } from "inversify";
import "reflect-metadata";
import { IAuctionCollection } from "../../Auction";
import { ICarOnSaleCalculation } from "../interface/ICarOnSaleCalculation";

@injectable()
export class CalculateCarOnSaleJson implements ICarOnSaleCalculation {
  public async calculate(auctions: IAuctionCollection): Promise<string> {
    if (auctions.length == 0) {
      throw new Error("Auctions list is empty");
    }

    let sumOfBids: number = 0;
    let sumOfBidsRatios: number = 0;

    for await (let auction of auctions) {
      sumOfBids += auction.numBids;
      sumOfBidsRatios += auction.bidRatio;
    }

    const result = {
      totalAuctions: auctions.getTotal(),
      averageBids: CalculateCarOnSaleJson.calculateAverageBids(
        sumOfBids,
        auctions
      ),
      averageBidsRatio: CalculateCarOnSaleJson.calculateBidsRatio(
        sumOfBidsRatios,
        auctions
      ),
    };

    return JSON.stringify(result);
  }

  public static calculateAverageBids(
    sumOfBids: number,
    auctions: IAuctionCollection
  ): number {
    const averageBids = sumOfBids / auctions.getTotal();
    return +averageBids.toFixed(2);
  }

  public static calculateBidsRatio(
    sumOfBidsRatios: number,
    auctions: IAuctionCollection
  ): number {
    const averageBidsRatio = sumOfBidsRatios / auctions.getTotal();
    return +averageBidsRatio.toFixed(2);
  }

  public static getInstance() {
    return new CalculateCarOnSaleJson();
  }
}
