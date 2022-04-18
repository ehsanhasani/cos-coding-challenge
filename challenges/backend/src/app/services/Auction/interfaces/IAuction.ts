export interface IAuction {
  id: number;
  label: string;
  endingTime: string;
  state: number;
  minimumRequiredAsk: number;
  currentHighestBidValue: number;
  numBids: number;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
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

  bidRatio: number;
}
