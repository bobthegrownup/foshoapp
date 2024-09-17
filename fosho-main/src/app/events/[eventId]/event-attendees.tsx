"use client";
import { confirmWithdrawTransaction, withdrawToken } from "@/actions/claim";
import RegisterButton from "@/components/register-button";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLoadingModal } from "@/hooks/use-loading-modal";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Transaction } from "@solana/web3.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import Claim from "./attendees/claim-component";

function EventAttendees({ event }: { event: any }) {
  const router = useRouter();
  const wallet = useWallet();
  const walletModal = useWalletModal();

  if (!wallet.connected || !wallet.publicKey) {
    return (
      <div className="w-full p-2">
        <Button onClick={() => walletModal.setVisible(true)} variant="outline">
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {event.walletAddress === wallet.publicKey?.toString() ? (
        <div className="flex justify-between p-2 items-center">
          <div className="flex  text-sm font-medium">
            ✅ Registrations are open
          </div>
          <div className="flex my-2 px-3 font-medium">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={18}><path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" /></svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/events/${event.id}/attendees`} className="text-sm">
                  <DropdownMenuItem className="p-1">
                    Attendees
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <div className="bg-white p-2 text-sm rounded-lg ">
          {event.attendees.find(
            (attendee: any) =>
              attendee.walletAddress === wallet.publicKey?.toString()
          ) ? (
            <div className="">
              <h1 className="font-medium">
                <button
                  type="button"
                  className=" bg-gray-100 text-gray-400 rounded-md shadow-sm text-sm my-2 p-2 w-full"
                >
                   👍 You have registered for this event!
                </button>
               
              </h1>
            </div>
          ) : (
            <>
              <span className="block text-sm text-gray-900 text-center">
                Click the button below to register for the event
              </span>
              <RegisterButton />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default EventAttendees;

