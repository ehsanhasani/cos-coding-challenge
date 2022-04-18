import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient, ICarOnSaleCalculation } from "./services/CarOnSaleClient";
import { IAuthentication } from "./services/Authentication";
import { Buyer } from "./services/Buyer";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUTHENTICATION) private authentication: IAuthentication,
        @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient,
        @inject(DependencyIdentifier.CALCULATE_CAR_ON_SALE_JSON) private calculateClientJson: ICarOnSaleCalculation) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);

        const buyer = Buyer.getInstance('buyer-challenge@caronsale.de', 'Test123.');

        await this.authentication.authenticate(buyer);
        
        const collection = await this.carOnSaleClient.getRunningAuctions(this.authentication);
        const output = await this.calculateClientJson.calculate(collection);
        
        this.logger.log(`Auction Output: ${output}`);

        process.exitCode = 0;
    }

}
