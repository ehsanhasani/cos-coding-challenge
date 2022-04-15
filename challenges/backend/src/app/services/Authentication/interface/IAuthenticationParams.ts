import { IAuthenticationRequest } from "./IAuthenticationRequest";

export interface IAuthenticationParams {
    email: string;
    authRequest: IAuthenticationRequest;
}