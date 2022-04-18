import { IError } from "./IError";

export interface IAuthenticationResult {
  authenticated: boolean;
  userId: string;
  internalUserId: string;
  internalUserUUID: string;
  token: string;
  type: number;
  privileges: string;
  userRole?: string;
  authenticationChallenge?: string;
  authenticationError?: IError;
}
