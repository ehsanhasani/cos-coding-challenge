export class AuthenticaionInvalidUserMailId extends Error {
  constructor() {
    super("Authentication Error: Invalid User Mail Id"); // (1)
    this.name = "InvalidUserMailId";
  }
}
