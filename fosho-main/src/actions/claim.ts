"use server";

import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

export interface Withdraw {
  payer: string;
  strategy: string;
}
interface ErrorRes {
  status_code: number;
  message: string;
}
export const withdrawToken = async (payload: Withdraw, eventId: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/transactions/${eventId}/withdraw`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { success: data };
  } catch (error) {
    const data = (error as AxiosError).response?.data as ErrorRes;
    return { error: data };
  }
};

interface ConfirmDepositTransaction {
  transactionId: string;
  serializedTransaction: string;
  eventId: string;
  walletAddress: string;
}

export const confirmWithdrawTransaction = async (
  payload: ConfirmDepositTransaction
) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/events/${payload.eventId}/claim`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidatePath(`/events`);
    revalidatePath(`/events/${payload.eventId}`);
    revalidatePath(`/events/${payload.eventId}/attemdees`);
    return { success: data };
  } catch (error) {
    const data = (error as AxiosError).response?.data as ErrorRes;
    return { error: data };
  }
};
