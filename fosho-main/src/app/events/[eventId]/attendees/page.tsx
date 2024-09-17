import { getEventDetails } from "@/actions/get-event-details";
import React from "react";
import AttendeesComponent from "./attendees-component";

async function page({ params }: { params: { eventId: string } }) {
  const { success: event, error } = await getEventDetails(params.eventId);

  return <AttendeesComponent event={event} />;
}

export default page;
