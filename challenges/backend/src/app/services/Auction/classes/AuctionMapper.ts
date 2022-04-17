import { IAuction } from "../interfaces/IAuction";
import { Auction } from "./Auction";

export class AuctionMapper {

    public static map(items: any[]): IAuction[] {
        const result: IAuction[] = [];
        for (let item of items) {
            result.push(this.mapItem(item));
        }

        return result;
    }

    public static mapItem(item: any): IAuction {
        const auction: IAuction = new Auction();
        auction.id = item.id;
        auction.label = item.label;
        auction.endingTime = item.endingTime;
        auction.state = item.state;
        auction.minimumRequiredAsk = item.minimumRequiredAsk;
        auction.currentHighestBidValue = item.currentHighestBidValue;
        auction.numBids = item.numBids;
        auction.startedAt = item.startedAt;
        auction.createdAt = item.createdAt;
        auction.updatedAt = item.updatedAt;
        auction.hotBid = item.hotBid;
        auction.originalMinimumRequiredAsk = item.originalMinimumRequiredAsk;
        auction.allowInstantPurchase = item.allowInstantPurchase;
        auction.instantPurchasePossibleUntil = item.instantPurchasePossibleUntil;
        auction.advertisementHtmlContent = item.advertisementHtmlContent;
        auction.instantPurchasePrice = item.instantPurchasePrice;
        auction.locationCountryCode = item.locationCountryCode;
        auction.startingBidValue = item.startingBidValue;
        auction.uuid = item.uuid;
        auction.startingBidValueNet = item.startingBidValueNet;
        auction.minimumRequiredAskNet = item.minimumRequiredAskNet;
        auction.originalMinimumRequiredAskNet = item.originalMinimumRequiredAskNet;
        auction.currentHighestBidValueNet = item.currentHighestBidValueNet;
        auction.amIHighestBidder = item.amIHighestBidder;
        return auction;
    }

}