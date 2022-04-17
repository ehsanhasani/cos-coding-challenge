import axios from "axios";
import { expect } from "chai";
import sinon from "sinon"
import { AuthenticaionFaild } from "../exceptions/AuthenticaionFaild";
import { AuthenticaionInvalidUserMailId } from "../exceptions/AuthenticationInvalidUserMailId";
import { IAuthenticationParams } from "../interface/IAuthenticationParams";
import { IAuthenticationResult } from "../interface/IAuthenticationResult";
import { ICanBeAuthenticate } from "../interface/ICanBeAuthenticated";
import { Authentication } from "./Authentication";

describe('Authentication', () => {
    let sandbox: any;
    const email = 'buyer-challenge@caronsale.de';
    const password = 'Test123.';

    const actor: ICanBeAuthenticate = {
        getAuthRequest(): IAuthenticationParams {
            return {
                email,
                authRequest: {
                    password
                }
            }
        }
    }

    const result: IAuthenticationResult = {
        authenticated: true,
        userId: 'foo',
        internalUserId: 'bar',
        internalUserUUID: 'forBar',
        token: 'FOOOO',
        type: 1,
        privileges: 'Barrr',
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(function () {
        sandbox.restore();
    });
    
    it('Authenticate Actor', async () => {
        const resolved = new Promise((r) => r({ data: result }));
        sandbox.stub(axios, 'put').returns(resolved);
        const instance = Authentication.getInstance();
        await instance.authenticate(actor);
        expect(instance.getResult()).deep.equal(result);
        expect(instance.getToken()).equal(result.token);
    });
    
    it('Authenticate throws invalid mail id', async () => {
        const rejected = Promise.reject({code: 400})
        sandbox.stub(axios, 'put').returns(rejected);
        const instance = Authentication.getInstance();
        try {
            await instance.authenticate(actor);
        } catch (err) {
            expect(err).instanceof(AuthenticaionInvalidUserMailId);
        }
    });

    it('Authenticate faild', async () => {
        const rejected = Promise.reject({code: 401})
        sandbox.stub(axios, 'put').returns(rejected);
        const instance = Authentication.getInstance();
        try {
            await instance.authenticate(actor);
        } catch (err) {
            expect(err).instanceof(AuthenticaionFaild);
        }
    });

    it('Get header for authorizaion for different Api call', async () => {
        const resolved = new Promise((r) => r({ data: result }));
        sandbox.stub(axios, 'put').returns(resolved);
        const instance = Authentication.getInstance();
        await instance.authenticate(actor);
        const header = instance.getAuthenticationHeader();

        expect(header.authtoken).equal(result.token);
        expect(header.userid).equal(result.internalUserUUID);
    });
    
});