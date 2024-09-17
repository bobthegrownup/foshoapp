
import React from "react";

async function page({ params }: { params: { calendarId: string } }) {
    const eventPage = {
        author: "Island Dao - Sea. Sun. Solana.",
        imgUrl: "https://pbs.twimg.com/profile_images/1767921371684765696/PiZH3hP2_400x400.jpg",
        description: "IslandDAO will be hosted at a massive villa near the beachfront that we have converted into a co-working paradise. Grab your laptop and work from anywhere, from the beach, to the pool, to the indoor work spaces. Panels, workshops, and talks will be hosted throughout the 1 month with founders and Solana Labs core devs. ",
        events: [
            {
                id: "18gdasdfgs",
                imgUrl: "https://pbs.twimg.com/media/GOgBpCsXwAAzMDk?format=jpg&name=large",
                title: "Event Kick off",
                datetime: "6:00 PM",
                description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                author: "anthony",
                location: "Conference Room 120",
                fee: {
                    amount: 1.15,
                    symbol: "SOL",
                    mintAddress: "123"
                },
                totalParticipants: 59,
                participants: [
                    {
                        displayName: "Nik",
                        imageUrl: "https://pbs.twimg.com/profile_images/1742907058091884544/9e2It_B7_400x400.jpg"
                    },
                    {
                        displayName: "Anthony",
                        imageUrl: "https://pbs.twimg.com/profile_images/1690127981723688960/bUvgjO1I_400x400.jpg"
                    }
                ]
            },
            {
                id: "18gdasdfgs",
                imgUrl: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/ix/c3497b1f-f873-4338-98ca-2356e1a02471",
                title: "Live Feedback - Earn $DEAN",
                datetime: "4:00 PM",
                description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                author: "bob",
                location: "Conference Room 150",
                fee: {
                    amount: 0.85,
                    symbol: "SOL",
                    mintAddress: "123"
                },
                totalParticipants: 6,
                participants: [
                    {
                        displayName: "Nik",
                        imageUrl: "https://pbs.twimg.com/profile_images/1753464979812978688/SPb3Ojrm_400x400.jpg"
                    },
                    {
                        displayName: "Anthony",
                        imageUrl: "https://pbs.twimg.com/profile_images/1760932813782634496/nLsohXps_400x400.jpg"
                    }
                ]
            },
            {
                id: "18gdasdfgs",
                imgUrl: "https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=75,width=400,height=400/event-covers/ix/c3497b1f-f873-4338-98ca-2356e1a02471",
                title: "Live Feedback - Earn $DEAN",
                datetime: "4:00 PM",
                description: "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
                author: "bob",
                location: "Conference Room 150",
                fee: {
                    amount: 0.005,
                    symbol: "SOL",
                    mintAddress: "123"
                },
                totalParticipants: 10,
                participants: [
                    {
                        displayName: "Nik",
                        imageUrl: "https://pbs.twimg.com/profile_images/1662809205634650113/I81QKrNK_400x400.png"
                    },
                    {
                        displayName: "Anthony",
                        imageUrl: "https://pbs.twimg.com/profile_images/1573726428901920768/LyB0Mral_400x400.jpg"
                    }
                ]
            }
        ],
    }
    return (
        <div className="flex pt-8 h-100 w-100 pb-8 bg-gradient-to-b from-blue-50 to-white ">
            <div className="flex mx-auto">
                <div className="grid grid-rows rounded-lg pb-10">
                    <div className="col-start-1 col-end-7 pb-2">
                        <div className="flex">
                            <div className="me-8">
                                <img className="rounded-lg h-[150px] w-[150px] shadow-sm shadow-black" src={eventPage.imgUrl} />
                                <div className="m-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 me-2 inline opacity-30 hover:opacity-100 hover:cursor-pointer" fill="rgb(23 37 84)" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z" /></svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 me-2 inline opacity-30 hover:opacity-100 hover:cursor-pointer" fill="rgb(23 37 84)" viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" /></svg>
                                </div>
                            </div>
                            <div className="w-[600px] mt-2">
                                <h1 className="text-3xl font-semibold font-sans ">{eventPage.author}</h1>
                                <p className="text-sm mt-2 text-gray-900">
                                    {eventPage.description}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <h1 className="text-xl font-light">
                            <span className="align-middle">EVENTS</span>
                        </h1>
                        <h1 className="font-light mb-1">
                            <span className="align-middle "><span className="font-bold">Tommorrow,</span> Tuesday</span>
                        </h1>
                    </div>
                    {eventPage.events.map((evnt, indx) => (
                        <div key={indx} className=" px-2">
                            <div className="flex">
                                <div>
                                    <a href={"/" + evnt.id} className="flex flex-col group items-center bg-white shadow md:flex-row  hover:cursor-pointer border-dashed border-3 border-b border-t-0 border-s-0 border-e-0">
                                        <img className="m-2 w-28 rounded-3xl group-hover:opacity-100 opacity-85 hover:opacity-100 p-3" src={evnt.imgUrl} alt="" />
                                        <div className="flex flex-col justify-between p-4 leading-normal">
                                            <h5 className="text-xl font-semibold tracking-tight text-black">{evnt.title}</h5>
                                            <p className="text-gray-800 text-sm">{evnt.description}</p>
                                            <div className="text-sm font-light text-gray-400">
                                                <span className="align-middle me-1">Coordinator: {evnt.author} |</span>
                                                {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline-block ms-3 opacity-60" viewBox="0 0 320 512"><path d="M16 144a144 144 0 1 1 288 0A144 144 0 1 1 16 144zM160 80c8.8 0 16-7.2 16-16s-7.2-16-16-16c-53 0-96 43-96 96c0 8.8 7.2 16 16 16s16-7.2 16-16c0-35.3 28.7-64 64-64zM128 480V317.1c10.4 1.9 21.1 2.9 32 2.9s21.6-1 32-2.9V480c0 17.7-14.3 32-32 32s-32-14.3-32-32z" /></svg> */}
                                                <span className="align-middle me-1">Location: {evnt.location} |</span>
                                                <span className="align-middle me-1">Time: {evnt.datetime}</span>
                                            </div>
                                            <div className="flex justify-between mt-2">
                                                <div className="flex">
                                                    <span className="mt-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full border-2 border-white flex justify-center items-center">
                                                        <p>$</p>
                                                    </span>
                                                    <span className="align-middle text-sm mt-1 ms-1">
                                                        Requires a Holding Fee of <span className="font-bold">{evnt.fee.amount} {evnt.fee.symbol}</span>
                                                    </span>
                                                </div>
                                                <div className="flex mt-1">
                                                    {evnt.participants.map((user, indx) => (
                                                        <span key={indx} className="text-xs">
                                                            <img className={indx == 0 ? "w-5 rounded-lg inline group-hover:opacity-100 opacity-85 hover:opacity-100" : "w-5 rounded-lg relative -left-2 group-hover:opacity-100 opacity-85 hover:opacity-100"} src={user.imageUrl} alt="" />
                                                        </span>
                                                    ))}
                                                    <span className="w-5 h-5 bg-gray-600 p-1 text-white text-xs rounded-full border-2 border-gray-600 flex justify-center items-center relative -left-4">
                                                        <span className="text-[0.60rem] font-light align-middle pe-1">+{evnt.totalParticipants}</span>
                                                    </span>

                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default page;