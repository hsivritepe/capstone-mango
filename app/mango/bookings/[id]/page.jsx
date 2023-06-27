'use client';

import MainTitle from '@/components/MainTitle/page';
import ErrorPage from '@/components/Error/page';
import Link from 'next/link';
import { Descriptions, Row, Col } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ShowBooking({ params }) {
    const [booking, setBooking] = useState([]);
    const [error, setError] = useState(null);

    const getBooking = async () => {
        const response = await axios.get(
            `${process.env.API_PATH}bookings/${params.id}`
        );
        console.log(response.data[0]);
        setBooking(response.data[0]);
    };

    useEffect(() => {
        getBooking();
    }, []);

    if (error) {
        return <ErrorPage error={error} />;
        // alert(error.result.data.message);
    }

    return (
        <>
            {booking.id && (
                <>
                    <MainTitle
                        title={
                            <>
                                Booking #{params.id} -{' '}
                                <span className="text-blue-800">
                                    {booking.first_name}{' '}
                                    {booking.last_name}
                                </span>
                            </>
                        }
                        // title={`Booking #${params.id}`}
                        description={`You can see the details of your booking from this page.`}
                    />
                    <Descriptions
                        title="Booking Details"
                        bordered
                        column={{
                            xxl: 4,
                            xl: 2,
                            lg: 2,
                            md: 2,
                            sm: 2,
                            xs: 1,
                        }}
                        className="p-6 bg-white"
                    >
                        <Descriptions.Item label="Home Name">
                            {booking.home_vs_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Home Real Name">
                            {booking.home_real_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Arrival Date">
                            {new Date(
                                booking.check_in
                            ).toLocaleString('en-US', {
                                dateStyle: 'medium',
                            })}
                        </Descriptions.Item>
                        <Descriptions.Item label="Departure Date">
                            {new Date(
                                booking.check_out
                            ).toLocaleString('en-US', {
                                dateStyle: 'medium',
                            })}
                        </Descriptions.Item>
                        <Descriptions.Item label="Booking Status">
                            {booking.booking_status}
                        </Descriptions.Item>
                        <Descriptions.Item label="Booking Owner">
                            {booking.booking_owner}
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title="Customer Details"
                        bordered
                        column={{
                            xxl: 4,
                            xl: 2,
                            lg: 2,
                            md: 2,
                            sm: 2,
                            xs: 1,
                        }}
                        className="p-6"
                    >
                        <Descriptions.Item label="Customer Name">
                            {booking.first_name} {booking.last_name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {booking.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {booking.phone}
                        </Descriptions.Item>
                    </Descriptions>
                    <Col span={24} className="bg-white">
                        <div className="p-6">
                            <Link
                                href={`/mango/bookings/${params.id}/edit`}
                                className="btn bg-blue-700 hover:bg-blue-800 px-6 normal-case text-neutral-100 hover:text-white"
                            >
                                EDIT
                            </Link>
                        </div>
                    </Col>
                </>
            )}
        </>
    );
}
