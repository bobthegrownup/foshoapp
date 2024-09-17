"use server";

import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
export interface CreateEventPayload {
  name: string;
  location: string,
  description: string;
  content: string;
  walletAddress: string;
  amount: number;
  eventTimestamp: Date;
}
interface ErrorRes {
  status_code: number;
  message: string;
}
export const createEvent = async (payload: CreateEventPayload) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/events/create-event`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidatePath(`/events`);

    return { success: data };
  } catch (error) {
    const data = (error as AxiosError).response?.data as ErrorRes;

    return { error: data };
  }
};
