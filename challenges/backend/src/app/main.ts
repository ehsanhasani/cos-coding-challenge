import dotenv from "dotenv";

dotenv.config();

import { Container } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { Logger } from "./services/Logger/classes/Logger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import { AuctionMonitorApp } from "./AuctionMonitorApp";
import {
  ICarOnSaleClient,
  ICarOnSaleCalculation,
  CarOnSaleClient,
  CalculateCarOnSaleJson,
} from "./services/CarOnSaleClient";
import { IAuthentication, Authentication } from "./services/Authentication";
import { IBuyer, Buyer } from "./services/Buyer";

/*
 * Create the DI container.
 */
const container = new Container({
  defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IBuyer>(DependencyIdentifier.BUYER).to(Buyer).inTransientScope();
container
  .bind<IAuthentication>(DependencyIdentifier.AUTHENTICATION)
  .to(Authentication)
  .inTransientScope();
container
  .bind<ICarOnSaleCalculation>(DependencyIdentifier.CALCULATE_CAR_ON_SALE_JSON)
  .to(CalculateCarOnSaleJson);
container
  .bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT)
  .to(CarOnSaleClient);

/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
  await app.start();
})();

process.on("uncaughtException", () => {
  process.exit(-1);
});
process.on("unhandledRejection", () => {
  process.exit(-1);
});
