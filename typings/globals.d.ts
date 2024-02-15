export {};
export type Roles =
  | "ADMIN"
  | "USER"
  | "GUEST"
  | "SUPERADMIN"
  | "SUSPENDED"
  | "DELETED";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
