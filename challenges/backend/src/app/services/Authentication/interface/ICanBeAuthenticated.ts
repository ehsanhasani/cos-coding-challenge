import { IAuthenticationParams } from "./IAuthenticationParams";

export interface ICanBeAuthenticate {
    getAuthRequest(): IAuthenticationParams
}