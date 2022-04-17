import axios from "axios";
import { injectable } from "inversify";
import "reflect-metadata";
import { AuthenticaionFaild } from "../exceptions/AuthenticaionFaild";
import { AuthenticaionInvalidUserMailId } from "../exceptions/AuthenticationInvalidUserMailId";
import { IAuthentication } from "../interface/IAuthentication";
import { IAuthenticationHeader } from "../interface/IAuthenticationHeader";
import { IAuthenticationResult } from "../interface/IAuthenticationResult";
import { ICanBeAuthenticate } from "../interface/ICanBeAuthenticated";

@injectable()
export class Authentication implements IAuthentication {
    private result: IAuthenticationResult;

    public setResult(value: IAuthenticationResult): void {
        this.result = value;
    }

    public getResult(): IAuthenticationResult {
        return this.result;
    }

    public getToken(): string {
        return this.getResult().token;
    }

    public getInternalUserUUID(): string {
        return this.getResult().internalUserUUID;
    }

    public async authenticate(actor: ICanBeAuthenticate): Promise<IAuthentication> {
        try {
            const result = await axios.put(
                `${process.env.API_BASE_URL}/v1/authentication/${actor.getAuthRequest().email}`,
                {
                    password: actor.getAuthRequest().authRequest.password
                }
            );
            
            this.setResult(result.data);
        } catch (err: any) {
            if (err.code == 400) {
                throw new AuthenticaionInvalidUserMailId();
            } else if (err.code == 401) {
                throw new AuthenticaionFaild();
            } else {
                throw err;
            }
        }

        return this;
    }

    public getAuthenticationHeader(): IAuthenticationHeader {
        return {
            authtoken: this.getToken(),
            userid: this.getInternalUserUUID()
        }
    }

    public static getInstance(): IAuthentication {
        return new Authentication();
    }

}