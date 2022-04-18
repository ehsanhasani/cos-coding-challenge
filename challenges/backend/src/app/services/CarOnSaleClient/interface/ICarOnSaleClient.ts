import { IAuctionCollection } from "../../Auction";
import { IAuthentication } from "../../Authentication";

/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
export interface ICarOnSaleClient {
  getRunningAuctions(auth: IAuthentication): Promise<IAuctionCollection>;
}
