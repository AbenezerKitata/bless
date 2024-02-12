"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { formSchema } from "@/lib/schemas";

const defaultValues = {
  email: "",
  password: "",
};

export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");

    const validatedFields = formSchema.safeParse({
      email: email,
    });

    if (!validatedFields.success) {
      return {
        message: "validation error",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    await signIn("nodemailer", formData);

    return {
      message: "success",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "credentials error",
            errors: {
              ...defaultValues,
            },
          };
        default:
          return {
            message: "unknown error",
            errors: {
              ...defaultValues,
              unknown: "unknown error",
            },
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}
