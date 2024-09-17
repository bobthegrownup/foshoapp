import Link from "next/link";
import React from "react";
import { eventPage } from "@/app/events/[eventId]/register/data";
import RegisterEventForm from "./register-form";
import { redirect } from "next/navigation";
import { getEventDetails } from "@/actions/get-event-details";
import Image from "next/image";

async function page({ params }: { params: { eventId: string } }) {
  const { success: event, error } = await getEventDetails(params.eventId);
const islandDaoImgUrl = "/islandaoicon.png";

  if (error) {
    redirect("/events");
  }
  return (
    <div className="flex flex-col items-center py-8 px-2 bg-gradient-to-b from-blue-50 to-white  ">
      <div className="flex w-full max-w-2xl lg:max-w-3xl mx-auto">
        <div className="px-2">
          <Image
            width={500}
            height={500}
            alt=""
            className="rounded-lg h-20 w-20 md:h-[150px] md:w-[150px] shadow-md"
            src={islandDaoImgUrl}
          />
          <div className="flex m-2">
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
        <div>
          <h1 className="md:text-2xl font-semibold font-sans max-w-xl">
            {event.name}
          </h1>
          <Link href={"/calendar/" + eventPage.author}>
            <span className="font-light text-sm">
              hosted by{" "}
              <a href="#" className="text-blue-800">
                @{eventPage.author}
              </a>
            </span>
          </Link>
          {/* <p className="text-sm mt-2 text-gray-900">
                                    {eventPage.description}
                                </p> */}
          <div className="hidden sm:block bg-white p-2 mt-2 rounded-lg ">
            <span className="block text-sm text-gray-900">
              Welcome! Please enter your details below to register for the
              event.{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="sm:hidden bg-white p-2 mt-2 rounded-lg ">
        <span className="block text-sm text-gray-900">
          Welcome! Please enter your details below to register for the event.{" "}
        </span>
      </div>

      <div className="flex flex-col items-start w-full max-w-2xl lg:max-w-3xl mx-auto py-6">
        <RegisterEventForm event={event} />
      </div>
    </div>
  );
}

export default page;
