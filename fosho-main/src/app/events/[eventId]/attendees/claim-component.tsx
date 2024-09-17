'use client';
import { confirmWithdrawTransaction, withdrawToken } from "@/actions/claim";
import { Button } from "@/components/ui/button";
import { useLoadingModal } from "@/hooks/use-loading-modal";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Claim({ event }: { event: any }) {
    const router = useRouter();
    const wallet = useWallet();
    const loadingModal = useLoadingModal();
  
    const attendee = event.attendees.find(
      (attendee: any) => attendee.walletAddress === wallet.publicKey?.toString()
    );
  
    if (!attendee) {
      return null;
    }
  
    const handleClaim = async () => {
      if (!wallet.publicKey || !wallet.signTransaction) return;
  
      loadingModal.onOpen();
      const withdrawPayload = {
        payer: wallet.publicKey.toString(),
        strategy: "blockhash",
      };
  
      const withdrawCreateResponse = await withdrawToken(
        withdrawPayload,
        event.id
      );
  
      if (withdrawCreateResponse.error) {
        loadingModal.onClose();
        return toast.error(withdrawCreateResponse.error.message);
      }
      const retreivedTx = Transaction.from(
        Buffer.from(
          withdrawCreateResponse.success.serializedTransaction,
          "base64"
        )
      );
  
      const serializedTx = await wallet.signTransaction(retreivedTx);
  
      const confirmTxPayload = {
        transactionId: withdrawCreateResponse.success.transactionId,
        serializedTransaction: serializedTx?.serialize().toString("base64"),
        eventId: event.id,
        walletAddress: wallet.publicKey.toString(),
      };
  
      const transactionResponse = await confirmWithdrawTransaction(
        confirmTxPayload
      );
  
      if (transactionResponse.error) {
        loadingModal.onClose();
        return toast.error(transactionResponse.error.message);
      }
  
      loadingModal.onClose();
  
      toast.success("Claim Successful");
      return router.push(`/events/${event.id}`);
    };
    if (attendee.claimStatus === "WAITING_CLAIM") {
      return (
        <div className="flex items-center justify-center w-full py-3">
          <Button className="px-5" onClick={handleClaim}>
            Claim
          </Button>
        </div>
      );
    }
  
    if (attendee.claimStatus === "CLAIMED") {
      return (
        <div className="flex items-center justify-center w-full py-3 font-bold bg-white bg-opacity-85 rounded-sm">
          CLAIMED 👍
        </div>
      );
    }
  }
  
  export default Claim;