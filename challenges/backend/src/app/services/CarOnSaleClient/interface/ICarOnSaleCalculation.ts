import { IAuctionCollection } from "../../Auction";

export interface ICarOnSaleCalculation {
    calculate(auctions: IAuctionCollection): string;
}