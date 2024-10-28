import type { DefaultUser } from "next-auth";
import { roles } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    image: string;
    email: string;
    role: roles;
    name: string;
  }
  interface Session {
    user?: DefaultUser & {
      id: string;
      role: roles;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
    role: roles;
  }
}
