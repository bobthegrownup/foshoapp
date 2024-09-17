"use server";

import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
export interface AddClaimPayload {
  attendeesId: string[];
}
interface ErrorRes {
  status_code: number;
  message: string;
}
export const addClaim = async (payload: AddClaimPayload, eventId: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/events/${eventId}/add-claim`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidatePath(`/events`);
    revalidatePath(`/events/${eventId}`);
    revalidatePath(`/events/${eventId}/attendees`);

    return { success: data };
  } catch (error) {
    const data = (error as AxiosError).response?.data as ErrorRes;

    return { error: data };
  }
};
