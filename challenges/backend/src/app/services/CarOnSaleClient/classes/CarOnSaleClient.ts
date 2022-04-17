import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { IAuctionCollection, AuctionCollection } from "../../Auction";
import { IAuthentication } from "../../Authentication";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public async getRunningAuctions(auth: IAuthentication): Promise<IAuctionCollection> {
        const headers = auth.getAuthenticationHeader();
        console.log(process.env.API_BASE_URL);
        const result = await axios.get(
            `${process.env.API_BASE_URL}/v2/auction/buyer/?filter=%20&count=false`,
            { headers: { authtoken: headers.authtoken, userid: headers.userid } }
        );

        const collection = AuctionCollection.getInstance(result.data);
        return collection;
    }

}