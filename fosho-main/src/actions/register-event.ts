"use server";

import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
export interface Deposit {
  payer: string;
  strategy: string;
  token: {
    mintAddress: string;
    amount: number;
  };
}
interface ErrorRes {
  status_code: number;
  message: string;
}
export const depositToken = async (payload: Deposit) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/transactions/deposit`,
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
  fullName: string;
  walletAddress: string;
  transactionId: string;
  serializedTransaction: string;
}

export const confirmDepositTransaction = async (
  payload: ConfirmDepositTransaction,
  eventId: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.API_URL}/events/${eventId}/register`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    revalidatePath(`/events`);
    revalidatePath(`/events/${eventId}`);
    return { success: data };
  } catch (error) {
    const data = (error as AxiosError).response?.data as ErrorRes;
    return { error: data };
  }
};
