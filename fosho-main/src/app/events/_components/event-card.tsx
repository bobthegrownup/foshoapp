import DateComponent from "@/components/date-component";
import Link from "next/link";

interface Props {
    id: string
}
const islandDaoImgUrl = "islandaoicon.png";

const EventCard = (eventDetail: any) => {
    if (!eventDetail.eventDetail) return <></>

    const event = eventDetail.eventDetail;    
    const isInPast = new Date() > new Date(event.eventTimestamp);
    const eventCreatorShortWalletAddress = event.walletAddress.toString().slice(0, 6) + "..." + event.walletAddress.toString().slice(-6);

    return (
        <Link
            href={`events/${event.id}`}
            className={"flex group items-center bg-white shadow md:flex-row  hover:cursor-pointer border-dashed border-3 border-b border-t-0 border-s-0 border-e-0 " 
                + (isInPast ? "opacity-70" : "")}>
            <div className="flex w-[800px]">
                <div className="my-auto flex-shrink-0">
                    <img className="sm:m-2 w-20 sm:w-28 object-cover rounded-3xl group-hover:opacity-100 opacity-85 hover:opacity-100 p-3"
                        src={islandDaoImgUrl}
                    />
                </div>
                <div className="flex flex-col p-2 leading-normal w-full">
                    <div>
                        <div className="font-semibold text-sm">

                            <div className="flex justify-between">
                                <div className="flex align-middle">
                                    <DateComponent datetime={event.eventTimestamp} /> 
                                </div>
                                <div className="flex">
                                    <span className="w-5 h-5 bg-blue-500 text-white text-xs rounded-full border-2 border-white flex justify-center items-center">
                                        <p>$</p>
                                    </span>
                                    <span className="align-middle text-sm ms-1">
                                        <span className="font-bold">{event.amount} SOL</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <h5 className="text-lg font-semibold tracking-tight text-black line-clamp-1">
                            {event.name}
                        </h5>
                        <div className="me-5 font-light text-[.75rem]">
                            <span className="pe-1">created by</span> <span className="text-blue-400">{eventCreatorShortWalletAddress}</span>
                        </div>
                    </div>
                    <div className=" mt-1 hidden sm:block">
                        <p className="text-gray-600 text-sm">
                            {event.description}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default EventCard;