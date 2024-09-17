"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { addClaim } from "@/actions/add-claim";
import { useParams } from "next/navigation";
import { useLoadingModal } from "@/hooks/use-loading-modal";
import { toast } from "sonner";

const FormSchema = z.object({
  attendees: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function AddClaimForm({ attendees }: { attendees: any }) {
  const { eventId } = useParams<{ eventId: string }>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      attendees: [], // These ones
    },
  });
  const loadingModal = useLoadingModal();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const attendeesId = data.attendees;
    loadingModal.onOpen();

    const { success, error } = await addClaim({ attendeesId }, eventId);
    if (error) {
      loadingModal.onClose();
      return toast.error(error.message);
    }

    loadingModal.onClose();
    return toast.success("Add Claim Successful");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="attendees"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-xl font-semibold">
                  Attendees
                </FormLabel>
                <FormDescription>Select the attendees.</FormDescription>
              </div>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="w-[100px]">Attended</th>
                    <th className="w-[200px]">Name</th>
                    <th className="w-[200px]">Twitter</th>
                    <th className="w-[200px]">Telegram</th>
                  </tr>
                </thead>
                <tbody>
                  {attendees.map((item: any, indx: number) => (
                    <tr key={indx} className="text-sm">
                      <td className="text-center">
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="attendees"
                          render={({ field }) => {
                            return (
                              <>
                                {item.claimStatus === "OPEN" ? (
                                  <FormItem
                                    key={item.id}
                                    className="flex items-center gap-3 "
                                  >
                                    <FormControl>
                                      <Checkbox
                                        className="w-4 h-4 mx-auto text-blue-600 border-gray-600 rounded "
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                            : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                ) : (
                                  <div className=" text-center ">
                                    {item.claimStatus === "CLAIMED"
                                      ? "Claimed"
                                      : "Approved"}
                                  </div>
                                )}
                              </>
                            );
                          }}
                        />
                      </td>
                      <td className=" text-center">{item.fullName}</td>
                      <td className=" text-center">{item.twitter}</td>
                      <td className=" text-center">{item.telegram}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Enable Claim</Button>
      </form>
    </Form>
  );
}

function AttendeeItem({ attendee }: { attendee: any }) {
  return (
    <div className="space-y-1">
      <p className="text-lg font-medium">{attendee.fullName}</p>
      <p>{attendee.walletAddress}</p>
      <div className="flex items-center gap-3">
        <Icons.discord className="w-5 h-5 text-black" />
        <Icons.twitter className="w-5 h-5 text-black" />
        <Icons.mail className="w-5 h-5 text-black" />
        <Icons.telegram className="w-5 h-5 text-black" />
      </div>
    </div>
  );
}
