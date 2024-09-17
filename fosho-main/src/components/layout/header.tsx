"use client";
import React from "react";

import Link from "next/link";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useTheme } from "next-themes";

function Header() {
  const { resolvedTheme } = useTheme();
  return (
    <div className=" text-black  ">
      <nav className="h-14 flex items-center justify-between px-4 mx-auto">
        <div className=" flex items-center lg:gap-4">
          <Link href="/events" className=" flex items-center lg:gap-4">
            <h2 className="text-2xl text-black md:text-2xl font-bold tracking-tight ">
              FOSHO
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <WalletMultiButton
            className="active:scale-95"
            style={{
              backgroundColor: resolvedTheme === "dark" ? "#09090b" : "inherit",
              boxShadow: "none",
              color: resolvedTheme === "dark" ? "white" : "black",
              border: "none",
              fontSize: "1rem",
            }}
          />
        </div>
      </nav>
    </div>
  );
}

export default Header;
