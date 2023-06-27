'use client';

import BookingList from '@/components/BookingList/page';
import MainTitle from '@/components/MainTitle/page';
import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';

export default function Bookings() {
    return (
        <>
            <MainTitle
                title="Bookings"
                description="Here you can see the bookings (reservations) listed that are in the system."
                button={true}
                buttonLink="/mango/bookings/add"
                buttonText="Add Booking"
                icon={<CalendarOutlined />}
            />
            <BookingList />
        </>
    );
}
