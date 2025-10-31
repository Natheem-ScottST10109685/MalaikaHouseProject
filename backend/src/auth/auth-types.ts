export type AuthUser = {
  id: string;
  email?: string;
  role?: "ADMIN" | "PARENT" | "PARTNER" | "STAFF";
  sub?: string;
  uid?: string;
  iat?: number;
  exp?: number;
};