'use client';

import Link from 'next/link';
import Image from 'next/image';
import MainTitle from '@/components/MainTitle/page';
import RecentBookings from '@/components/RecentBookings/page';
import { Card } from 'antd';
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ErrorPage from '@/components/Error/page';

export default function Dashboard() {
    const [numberOfBookings, setNumberOfBookings] = useState(0);
    const [numberOfHomes, setNumberOfHomes] = useState(0);
    const [numberOfContacts, setNumberOfContacts] = useState(0);

    const getNumberOfBookings = async () => {
        try {
            const response = await axios.get(
                `${process.env.API_PATH}bookings`
            );
            setNumberOfBookings(response.data.length);
        } catch (error) {
            return <ErrorPage error={error} />;
        }
    };

    const getNumberOfHomes = async () => {
        try {
            const response = await axios.get(
                `${process.env.API_PATH}homes`
            );
            setNumberOfHomes(response.data.length);
        } catch (error) {
            return <ErrorPage error={error} />;
        }
    };

    const getNumberOfContacts = async () => {
        try {
            const response = await axios.get(
                `${process.env.API_PATH}contacts`
            );
            setNumberOfContacts(response.data.length);
        } catch (error) {
            return <ErrorPage error={error} />;
        }
    };

    useEffect(() => {
        getNumberOfBookings();
        getNumberOfHomes();
        getNumberOfContacts();
    }, []);

    return (
        <>
            <MainTitle
                title="Dashboard"
                description="Here you can see the houses (villas) listed that are in the system."
            />
            <section className="flex gap-10 bg-gray-500 p-6">
                <Card className="flex-1">
                    <div className="flex justify-between">
                        <div className="">
                            <div className="text-base font-medium">
                                Bookings
                            </div>
                            <div className="text-2xl font-semibold py-2">
                                {numberOfBookings}
                            </div>
                            <div className="text-sm font-normal text-[#697488]">
                                Total bookings
                            </div>
                        </div>
                        <div className="flex align-middle">
                            <Image
                                src="/img/dashboard/3.svg"
                                alt="Landscape picture"
                                width={60}
                                height={60}
                            />
                        </div>
                    </div>
                </Card>
                <Card className="flex-1">
                    <div className="flex justify-between">
                        <div className="">
                            <div className="text-base font-medium">
                                Homes
                            </div>
                            <div className="text-2xl font-semibold py-2">
                                {numberOfHomes}
                            </div>
                            <div className="text-sm font-normal text-[#697488]">
                                Total homes
                            </div>
                        </div>
                        <div className="flex align-middle">
                            <Image
                                src="/img/dashboard/1.svg"
                                alt="Landscape picture"
                                width={60}
                                height={60}
                            />
                        </div>
                    </div>
                </Card>
                <Card className="flex-1">
                    <div className="flex justify-between">
                        <div className="">
                            <div className="text-base font-medium">
                                Contacts
                            </div>
                            <div className="text-2xl font-semibold py-2">
                                {numberOfContacts}
                            </div>
                            <div className="text-sm font-normal text-[#697488]">
                                Total contacts
                            </div>
                        </div>
                        <div className="flex align-middle">
                            <Image
                                src="/img/dashboard/4.svg"
                                alt="Landscape picture"
                                width={60}
                                height={60}
                            />
                        </div>
                    </div>
                </Card>
            </section>
            <RecentBookings />
        </>
        // <>
        //     <div class="row y-gap-30">
        //         <div class="col-xl-3 col-md-6">
        //             <div class="py-30 px-30 rounded-4 bg-white shadow-3">
        //                 <div class="row y-gap-20 justify-between items-center">
        //                     <div class="col-auto">
        //                         <div class="fw-500 lh-14">
        //                             Pending
        //                         </div>
        //                         <div class="text-26 lh-16 fw-600 mt-5">
        //                             $12,800
        //                         </div>
        //                         <div class="text-15 lh-14 text-light-1 mt-5">
        //                             Total pending
        //                         </div>
        //                     </div>
        //                     <div class="col-auto">
        //                         <Image
        //                             src="/img/dashboard/1.svg"
        //                             alt="Landscape picture"
        //                             width={60}
        //                             height={60}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="col-xl-3 col-md-6">
        //             <div class="py-30 px-30 rounded-4 bg-white shadow-3">
        //                 <div class="row y-gap-20 justify-between items-center">
        //                     <div class="col-auto">
        //                         <div class="fw-500 lh-14">
        //                             Earnings
        //                         </div>
        //                         <div class="text-26 lh-16 fw-600 mt-5">
        //                             $14,200
        //                         </div>
        //                         <div class="text-15 lh-14 text-light-1 mt-5">
        //                             Total earnings
        //                         </div>
        //                     </div>
        //                     <div class="col-auto">
        //                         <Image
        //                             src="/img/dashboard/2.svg"
        //                             alt="Landscape picture"
        //                             width={60}
        //                             height={60}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="col-xl-3 col-md-6">
        //             <div class="py-30 px-30 rounded-4 bg-white shadow-3">
        //                 <div class="row y-gap-20 justify-between items-center">
        //                     <div class="col-auto">
        //                         <div class="fw-500 lh-14">
        //                             Bookings
        //                         </div>
        //                         <div class="text-26 lh-16 fw-600 mt-5">
        //                             $8,100
        //                         </div>
        //                         <div class="text-15 lh-14 text-light-1 mt-5">
        //                             Total hotel bookings
        //                         </div>
        //                     </div>
        //                     <div class="col-auto">
        //                         <Image
        //                             src="/img/dashboard/3.svg"
        //                             alt="Landscape picture"
        //                             width={60}
        //                             height={60}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //         <div class="col-xl-3 col-md-6">
        //             <div class="py-30 px-30 rounded-4 bg-white shadow-3">
        //                 <div class="row y-gap-20 justify-between items-center">
        //                     <div class="col-auto">
        //                         <div class="fw-500 lh-14">
        //                             Services
        //                         </div>
        //                         <div class="text-26 lh-16 fw-600 mt-5">
        //                             22,786
        //                         </div>
        //                         <div class="text-15 lh-14 text-light-1 mt-5">
        //                             Total bookable services
        //                         </div>
        //                     </div>
        //                     <div class="col-auto">
        //                         <Image
        //                             src="/img/dashboard/4.svg"
        //                             alt="Landscape picture"
        //                             width={60}
        //                             height={60}
        //                         />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    );
}
