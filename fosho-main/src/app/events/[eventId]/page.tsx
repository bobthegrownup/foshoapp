
import { getEventDetails } from "@/actions/get-event-details";
import Link from "next/link";
import React from "react";
import EventAttendees from "./event-attendees";
import Image from "next/image";
import DateComponent from "@/components/date-component";
import Content from "../_components/content";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Claim from "./attendees/claim-component";


const islandDaoImgUrl = "islandaoicon.png";

async function page({ params }: { params: { eventId: string } }) {
  const { success: event, error } = await getEventDetails(params.eventId);

  if (error) {
    return <div>Event is not available</div>;
  }
  return (
    <div className="flex flex-col items-center py-8 ">
      <div className="w-full sm:max-w-md md:max-w-3xl bg-white rounded p-2">
        <div className="flex">
          <div className="w-full flex justify-between">
            <EventAttendees event={event} />           
          </div>
        </div>

      </div>

      <div className="w-full  sm:max-w-md md:max-w-3xl bg-white p-2">
        <div className="p-2">
          <h1 className="text-xl font-light mb-2 ">
            <span className="align-middle font-bold">{event.name}</span>
          </h1>
          <div className="font-light mb-1 text-[.75rem]">
            <span className="align-middle ">
            <svg xmlns="http://www.w3.org/2000/svg" width={12} className="inline opacity-65" viewBox="0 0 448 512"><path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z"/></svg>
              <span className="align-middle ps-2"><DateComponent datetime={event.eventTimestamp} /></span>
            </span>
          </div>
          <div className="font-light mb-1 text-[.75rem]">
            <span className="align-middle ">           
            <svg xmlns="http://www.w3.org/2000/svg" width={12} className="inline opacity-65" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
              <span className="align-middle ps-2"> {event.location}</span>
            </span>
          </div>
          <div className="font-light mb-1 text-[.75rem]">
            <span className="align-middle ">                       
            <svg xmlns="http://www.w3.org/2000/svg" width={12} className="inline opacity-65" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
              <span className="align-middle ps-2"> {event.walletAddress}</span>
            </span>
          </div>
          <div className="font-light mb-1 text-[.75rem]">
            <span className="align-middle ">                                   
            <svg xmlns="http://www.w3.org/2000/svg" width={16} className="inline opacity-65" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>
              <span className="align-middle ps-1"> {event?.attendees?.length} {event?.attendees?.length > 1 ? "Attendees" : "Attendee"}</span>
            </span>
          </div>
          <div className="font-light mb-1 text-[.75rem]">
            <div className="flex align-middle ">                                   
            <span className="w-5 h-5 bg-stone-500 text-gray-100 text-xs rounded-full border-2 border-white flex justify-center items-center">
              <p>$</p>
            </span>
            <span className="align-middle">
              <span className="align-middle ps-1">{event.amount} SOL</span>
            </span>
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className=" mb-1">
            <h1 className="font-medium mb-2 bg-stone-50">
              <span className="align-middle">description</span>
            </h1>
            <div className="text-sm">{event.description}</div>          
          </div>
        </div>
        <div className="p-2">
          <div className="mb-1">
            <h1 className="font-medium mb-2 bg-stone-50">
              <span className="align-middle">overview</span>
            </h1>
            <Content content={event.content} />
          </div>
        </div>
        <Claim event={event} />
      </div>
    </div>
  );
}

export default page;
