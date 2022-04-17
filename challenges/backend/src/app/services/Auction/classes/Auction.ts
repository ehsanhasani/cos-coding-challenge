import { IAuction } from "../interfaces/IAuction";

export class Auction implements IAuction  {
    id: number;
    label: string;
    state: number;
    minimumRequiredAsk: number;
    currentHighestBidValue: number;
    numBids: number;
    hotBid: boolean;
    originalMinimumRequiredAsk: string;
    allowInstantPurchase: boolean;
    instantPurchasePossibleUntil: string;
    advertisementHtmlContent: string;
    instantPurchasePrice: string;
    locationCountryCode: string;
    startingBidValue: number;
    uuid: string;
    startingBidValueNet: number;
    minimumRequiredAskNet: number;
    originalMinimumRequiredAskNet: string;
    currentHighestBidValueNet: number;
    amIHighestBidder: boolean;
    endingTime: string;
    startedAt: string;
    createdAt: string;
    updatedAt: string;

    public get bidRatio(): number {
        return this.currentHighestBidValue / this.minimumRequiredAsk;
    }
}