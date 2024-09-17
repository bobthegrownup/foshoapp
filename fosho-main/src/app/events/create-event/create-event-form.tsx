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
import { useRouter } from "next/navigation";
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
import { useLoadingModal } from "@/hooks/use-loading-modal";
import TiptapEditor from "@/components/tiptap/tiptap-editor";

const eventFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, {
      message: "Event Name must be at least 3 characters.",
    })
    .max(100, {
      message: "Event Name must not be longer than 100 characters.",
    }),
    location: z
    .string()
    .trim()
    .min(3, {
      message: "Event Location must be at least 3 characters.",
    })
    .max(200, {
      message: "Event Location must not be longer than 200 characters.",
    }),
  description: z
    .string({
      required_error: "Please enter a description.",
    })
    .trim()
    .min(50, {
      message: "Event description must be at least 50 characters.",
    })
    .max(100, {
      message: "Event description must not be longer than 100 characters.",
    }),
  content: z
  .string({
    required_error: "Please enter information about the event.",
  })
  .trim()
  .min(3, {
    message: "Event content must be at least 3 characters.",
  })
  .max(1000, {
    message: "Event content must not be longer than 1000 characters.",
  }),
  amount: z.coerce.number().default(1),
  eventTimestamp: z.date(),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function CreateEventForm() {
  const queryClient = useQueryClient();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    // defaultValues,
    mode: "onChange",
  });
  // const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  const router = useRouter();

  const wallet = useWallet();
  const walletModal = useWalletModal();
  const loadingModal = useLoadingModal();

  // const { fields, append } = useFieldArray({
  //   name: "urls",
  //   control: form.control,
  // });

  async function onSubmit(data: EventFormValues) {
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

    loadingModal.onOpen();

    const content: CreateEventPayload = {
      name: data.name,
      location: data.location,
      description: data.description,
      content: data.content,
      amount: data.amount,
      walletAddress: wallet.publicKey.toBase58(),
      eventTimestamp: data.eventTimestamp,
    };

    const { success, error } = await createEvent(content);

    if (error) {
      loadingModal.onClose();
      return toast.error("Failed to create event.");
    }
    if (success) {
      toast.success("Event Created!🎉");
      router.push(`/events/${success.id}`);
      loadingModal.onClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="InnovateX: Global AI Summit"
                  className="focus:border-none focus:outline-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Event Location"
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Groundbreaking AI summit ignites global innovation in tech and ethics, shaping future landscapes."
                  className=" focus:outline-none focus:border-none"
                  rows={1}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Overview</FormLabel>
              <FormDescription>
                Describe the event and provide any additional information
              </FormDescription>
              <FormControl>
                <TiptapEditor content={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormDescription>
                The amount in SOL that should be held for the user.
              </FormDescription>
              <FormControl>
                <Input type="number" className="w-[280px]" placeholder="0.05" {...field} />
              </FormControl>
              {/* <FormDescription>Enter Amount.</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventTimestamp"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Time</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP HH:mm:ss")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    fromDate={new Date()}
                    toDate={new Date("2024-12-31")}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="p-3 border-t border-border">
                    <TimePickerDemo
                      setDate={field.onChange}
                      date={field.value}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        {wallet.connected ? (
          <Button
            type="submit"
            className="rounded-full w-100"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Create
          </Button>
        ) : (
          <Button
            onClick={() => walletModal.setVisible(true)}
            type="button"
            className="rounded-full w-100"
          >
            Connect Wallet
          </Button>
        )}
      </form>
    </Form>
  );
}
