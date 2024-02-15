import { auth } from "@clerk/nextjs";
import ProtectedHomePage from "./(protected)/home/page";
import UnprotectedHomePage from "./(unprotected)/home/page";

export default async function Home() {
  const session = auth();
  // console.log(session);

  return (
    // make the main tag responsive
    <main className="h-screen mx-auto">
      <ProtectedHomePage />
      <UnprotectedHomePage />
    </main>
  );
}
