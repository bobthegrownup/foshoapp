import { getEvents } from "@/actions/get-events";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import EventCard from "./_components/event-card";

dayjs.extend(utc);
dayjs.extend(timezone);

const islandDaoTitle = "Island Dao - Sea. Sun. Solana.";
const islandDaoDesc = "IslandDAO will be hosted at a massive villa near the beachfront that we have converted into a co-working paradise. Grab your laptop and work from anywhere, from the beach, to the pool, to the indoor work spaces. Panels, workshops, and talks will be hosted throughout the 1 month with founders and Solana Labs core devs. ";
const islandDaoImgUrl = "islandaoicon.png";

async function Events() {
  const events = await getEvents();
  const totalEvents: number = events.success ? events.success.length : 0;

  return (
    <div className="flex pt-8 pb-8">
      <div className="mx-auto w-full sm:max-w-md md:max-w-3xl">
        <div className="col-start-1 col-end-7 pb-2">
          <div className="flex-row m-2">
            <div className="flex">
              <img className="me-8 rounded-lg h-[150px] w-[150px] " src={islandDaoImgUrl} />
              <div>
                <h1 className="text-3xl font-semibold font-sans ">
                  {islandDaoTitle}
                </h1>
                <p className="text-sm mt-2 text-gray-900 max-w-[600px] line-clamp-3 md:line-clamp-4">
                  {islandDaoDesc}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <Link href="https://x.com/IslandDAOx" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 me-2 inline opacity-30 hover:opacity-100 hover:cursor-pointer"
                  fill="rgb(23 37 84)"
                  viewBox="0 0 448 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" />
                </svg>
              </Link>

              <Link href="https://island-dao.com/" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 me-2 inline opacity-30 hover:opacity-100 hover:cursor-pointer"
                  fill="rgb(23 37 84)"
                  viewBox="0 0 512 512"
                >
                  <path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" />
                </svg>
              </Link>
            </div>

          </div>
        </div>
        <div className="flex w-full items-center  justify-between px-2 lg:px-0">
          <div className="p-2">
            <h1 className="text-xl font-light">
              <span className="align-middle">EVENTS</span>
            </h1>
            <h1 className="font-light mb-1">
              <span className="align-middle text-sm">
                Total Events: {totalEvents}
              </span>
            </h1>
          </div>
          <div>
            <Link
              href="/events/create-event"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Create Event
            </Link>
          </div>
        </div>
        <div>
          {events.success ? events.success.map((evnt: any, indx: number) => (
            <EventCard key={indx} eventDetail={evnt} />
          )) : <></>}
        </div>

      </div>
    </div>
  );
}

export default Events;
