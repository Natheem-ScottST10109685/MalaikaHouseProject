import type { AuthUser } from "../auth/auth-types";

export {};

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthUser;
  }
}
