import axios from "axios";
import { IAuctionCollection, AuctionCollection } from "../../Auction";
import { IAuthentication } from "../../Authentication";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";

export class CarOnSaleClient implements ICarOnSaleClient {

    public async getRunningAuctions(auth: IAuthentication): Promise<IAuctionCollection> {
        const result = await axios.get(
            `${process.env.API_BASE_URL}/v2/auction/buyer`,
            { headers: { ...auth.getAuthenticationHeader() } }
        );

        const collection = AuctionCollection.getInstance(result.data);
        return collection;
    }

}