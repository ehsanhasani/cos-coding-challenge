import { IAuthenticationResult } from "./IAuthenticationResult";
import { ICanBeAuthenticate } from "./ICanBeAuthenticated";

export interface IAuthentication {
    getToken(): string;
    getResult(): IAuthenticationResult;
    authenticate(actor: ICanBeAuthenticate): Promise<IAuthentication>;

}