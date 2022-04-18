export class AuthenticaionFaild extends Error {
  constructor() {
    super("Authentication Faild"); // (1)
    this.name = "AuthenticaionFaild";
  }
}
