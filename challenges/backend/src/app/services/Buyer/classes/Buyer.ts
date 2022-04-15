import { ICanBeAuthenticate, IAuthenticationParams } from "../../Authentication";
import { IBuyer } from "../interface/IBuyer";

export class Buyer implements IBuyer, ICanBeAuthenticate {

    private email: string = '';
    private password: string = '';

    public setEmail(value: string): void {
        this.email = value;
    }

    public getEmail(): string {
        return this.email;
    }

    public setPassword(value: string): void {
        this.password = value;
    }

    public getPassword(): string {
        return this.password;
    }

    public getAuthRequest(): IAuthenticationParams {
        return {
            email: this.getEmail(),
            authRequest: {
                password: this.getPassword(),
            }
        }
    }

    public static getInstance(email: string, password: string): Buyer {
        const instance = new Buyer();
        instance.setEmail(email);
        instance.setPassword(password);
        return instance;
    }

}