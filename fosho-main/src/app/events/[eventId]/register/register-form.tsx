"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams, useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import base58 from "bs58";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEvent, CreateEventPayload } from "@/actions/create-event";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TimePickerDemo } from "@/components/time-picker/time-picker-demo";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  confirmDepositTransaction,
  depositToken,
} from "@/actions/register-event";
import { LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import { useLoadingModal } from "@/hooks/use-loading-modal";
import { getSolBalance } from "@/lib/web3-util";

const registerFormSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(5, {
      message: "Full Name must be at least 5 characters.",
    })
    .max(50, {
      message: "Full Name must not be longer than 50 characters.",
    }),

  discord: z
    .string()
    .trim()
    .max(15, {
      message: "must not be longer than 15 characters.",
    })
    .optional(),

  twitter: z
    .string()
    .trim()
    .max(15, {
      message: "must not be longer than 15 characters.",
    })
    .optional(),

  email: z
    .string()
    .trim()
    .max(35, {
      message: "must not be longer than 35 characters.",
    })
    .email()
    .optional(),

  telegram: z
    .string()
    .trim()
    .max(15, {
      message: "must not be longer than 15 characters.",
    })
    .optional(),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterEventForm({ event }: { event: any }) {
  const { eventId } = useParams();
  const queryClient = useQueryClient();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    // defaultValues,
    mode: "onChange",
  });
  // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const router = useRouter();

  const wallet = useWallet();
  const walletModal = useWalletModal();
  const loadingModal = useLoadingModal();

  async function payRegistrationFee(data: RegisterFormValues) {
    if (!wallet.connected) {
      toast.warning("Please connect your wallet!");
      walletModal.setVisible(true);
    }
    if (
      !wallet.connected ||
      !wallet.publicKey ||
      !wallet.signMessage ||
      !wallet.signTransaction
    )
      return;

    if (
      event.attendees.find(
        (attendee: any) =>
          attendee.walletAddress === wallet.publicKey?.toString()
      )
    )
      return toast.error("You have already registered for this event");

      let userSolBalance = await getSolBalance(wallet.publicKey.toBase58());
      let minSolRequired = (event.amount + 0.004)
      if (userSolBalance < minSolRequired) {
        throw new Error("Wallet balance must be greater than " + parseFloat(minSolRequired).toFixed(5) + " SOL");        
      }

    loadingModal.onOpen();
    const depositPayload = {
      payer: wallet.publicKey.toString(),
      strategy: "blockhash",
      token: {
        mintAddress: "So11111111111111111111111111111111111111112",
        amount: event.amount,
      },
    };
    const depositCreateResponse = await depositToken(depositPayload);

    if (depositCreateResponse.error) {
      throw new Error(depositCreateResponse.error.message);
    }

    const retreivedTx = Transaction.from(
      Buffer.from(depositCreateResponse.success.serializedTransaction, "base64")
    );

    const serializedTx = await wallet.signTransaction(retreivedTx);

    const confirmTxPayload = {
      transactionId: depositCreateResponse.success.transactionId,
      serializedTransaction: serializedTx?.serialize().toString("base64"),
      fullName: data.fullname,
      discord: data.discord,
      twitter: data.twitter,
      email: data.email,
      telegram: data.telegram,

      walletAddress: wallet.publicKey.toString(),
    };

    const transactionResponse = await confirmDepositTransaction(
      confirmTxPayload,
      event.id
    );

    if (transactionResponse.error) {
      throw new Error(transactionResponse.error.message);
    }
  }
  async function onSubmit(data: RegisterFormValues) {
    loadingModal.onOpen();
    try {
      await payRegistrationFee(data);
      toast.success("Registration successful!🎉🎉");
      router.push(`/events/${eventId}`);
    } catch (error) {
      toast.error("Oops!", {
        description: (error as Error).message,
      });
    } finally {
      loadingModal.onClose();
    }
  }

  if (wallet.publicKey && event.walletAddress === wallet.publicKey.toString()) {
    router.push(`/events/${event.id}`);
  }

  if (
    event.attendees.find(
      (attendee: any) => attendee.walletAddress === wallet.publicKey?.toString()
    )
  ) {
    return (
      <div className="">
        <h1 className="text-xl font-medium">You have already registered!</h1>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 pb-10 w-full "
      >
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nikhil Kumar"
                  className="max-w-md focus:border-none focus:outline-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-4 w-full ">
          <FormField
            control={form.control}
            name="discord"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Discord username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nikhilkr23"
                    className=" focus:border-none focus:outline-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter handle</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nikhilkr23"
                    className=" focus:border-none focus:outline-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@nikhilkr.in"
                    className=" focus:border-none focus:outline-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telegram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="nikhilkr23"
                    className=" focus:border-none focus:outline-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {wallet.connected ? (
          <Button
            type="submit"
            className="rounded-full w-full md:w-1/2"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Register
          </Button>
        ) : (
          <Button
            onClick={() => walletModal.setVisible(true)}
            type="button"
            className="rounded-full w-full md:w-1/2"
          >
            Connect Wallet
          </Button>
        )}
      </form>
    </Form>
  );
}
