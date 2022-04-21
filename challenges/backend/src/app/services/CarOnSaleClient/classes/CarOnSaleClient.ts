import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { IAuctionCollection, AuctionCollection } from "../../Auction";
import { AuctionFilter } from "../../Auction/classes/AuctionFilter";
import { AuctionRequest } from "../../Auction/classes/AuctionRequest";
import { IAuthentication } from "../../Authentication";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
  public async getRunningAuctions(
    auth: IAuthentication
  ): Promise<IAuctionCollection> {
    const filter = AuctionFilter.getInstance();
    const headers = auth.getAuthenticationHeader();
    const url = `${process.env.API_BASE_URL}/v2/auction/buyer/`;

    const auctionRequest = new AuctionRequest(url, filter, headers);
    const result = await axios.get(`${url}${filter.getQueryString()}`, {
      headers: { authtoken: headers.authtoken, userid: headers.userid },
    });

    const collection = AuctionCollection.getInstance(
      result.data,
      auctionRequest
    );
    return collection;
  }
}
