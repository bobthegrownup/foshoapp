"use server";
import axios from "axios";

interface Register {
  name: string;
  email: string;
  twitter: string;
  telegram: string;
}

export async function register(calendarId: string, dto: Register) {
  try {
    const response = await axios.post(
      `http://localhost:3333/calendar/${calendarId}/register`,
      dto
    );
    return response.data;
  } catch (e) {
    return { message: "Error on register" };
  }
}
