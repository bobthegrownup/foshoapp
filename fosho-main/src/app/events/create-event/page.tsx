import React from "react";
import CreateEventForm from "./create-event-form";

function page() {
  return (
    <div className="container max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold py-5">Create Event</h1>
      <CreateEventForm />
    </div>
  );
}

export default page;
