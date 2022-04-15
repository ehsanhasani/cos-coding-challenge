import { expect } from "chai";
import { Buyer } from "./Buyer";

describe('Buyer', () => {
    const email = 'buyer-challenge@caronsale.de';
    const password = 'Test123.';
    
    it('Set Email & Password and read email', () => {
        const instance = Buyer.getInstance(email, password);
        expect(instance.getEmail()).equal(email);
        expect(instance.getPassword()).equal(password);
    });
    
    it('Get Auth Request', () => {
        const instance = Buyer.getInstance(email, password);
        const auth = instance.getAuthRequest();
        expect(auth.email).equal(email);
        expect(auth.authRequest.password).equal(password);
    });
    
});