"use server";

import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData) {
  if (!checkRole("SUPERADMIN")) {
    return {
      status: 401,
      body: {
        message: "Unauthorized",
      },
    };
  }
  try {
    const res = await clerkClient.users.updateUser(
      formData.get("id") as string,
      {
        publicMetadata: {
          role: formData.get("role"),
        },
      }
    );
    return {
      status: 200,
      body: res.publicMetadata,
    };
  } catch (e) {
    return {
      status: 500,
      body: {
        message: e,
      },
    };
  }
}
