"use server";

export async function getEventDetails(eventId: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/events/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return { success: data };

  } catch (error) {
    const data = error instanceof Error && error.message ? error.message : 'An unknown error occurred';
    return { error: data };
  }
}
