import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="">
      <div>
        <SignOutButton>
          <Button>Sign Out</Button>
        </SignOutButton>
      </div>
    </main>
  );
}
