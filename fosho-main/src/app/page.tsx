import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/events" className={cn(buttonVariants({ variant: "link" }))}>
        Go to Events
      </Link>
    </div>
  );
}
