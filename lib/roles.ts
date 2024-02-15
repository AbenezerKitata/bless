import { Roles } from "@/typings/globals";
import { auth } from "@clerk/nextjs";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
