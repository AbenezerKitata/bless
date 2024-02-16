import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ModeToggle } from "@/components/mode-toggle";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import MenuButton from "@/components/menu-button";
import ShowWindowSize from "@/components/show-window-size";
import { Toaster } from "@/components/ui/toaster";

// import {
//   RegisterLink,
//   LoginLink,
// } from "@kinde-oss/kinde-auth-nextjs/components";
export const metadata: Metadata = {
  title: {
    template: "Abenezer's Playground",
    default: "Kitata's Playground",
  },
  description: "My capablities and interests",
  metadataBase: new URL("https://AbenezerKitata.com/"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = auth();

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            // defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="px-5 flex items-center sticky top-0">
              <MenuButton />

              <div
                className="w-full flex justify-end items-center gap-4  py-3 z-0 sticky top-0 bg-transparent"
                style={{ opacity: 0.8 }}
              >
                <ModeToggle />
                {session.userId && <UserButton />}
              </div>
            </div>
            <div className="z-10">{children}</div>
            {/* <div className="w-full flex justify-between"> */}
            {/* Kinde auth provider */}
            {/* <LoginLink>Sign in</LoginLink>
          
        <RegisterLink>Sign up</RegisterLink> */}
            {/* </div> */}
            {/* </div> */}
            {/* {process.env.NODE_ENV === "development" && <ShowWindowSize />} */}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
