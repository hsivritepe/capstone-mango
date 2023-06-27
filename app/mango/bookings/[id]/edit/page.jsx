'use client';

import MainTitle from '@/components/MainTitle/page';
import ErrorPage from '@/components/Error/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    DatePicker,
    Space,
    Form,
    Input,
    Button,
    message,
} from 'antd';
import dayjs from 'dayjs';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    console.log('values', values);
    console.log('submittable', submittable);
    useEffect(() => {
        form.validateFields({
            validateOnly: true,
        }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                setSubmittable(false);
            }
        );
    }, [values, form]);
    return (
        <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
        >
            Save
        </Button>
    );
};

export default function EditBooking({ params }) {
    const [bookingAttributes, setBookingAttributes] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    const getBookingAtts = () => {
        axios
            .get(`${process.env.API_PATH}bookings/${params.id}}`)
            .then((response) => {
                console.log('booking', response.data[0]);
                setBookingAttributes(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // !req.body.user_id ||
    //     !req.body.home_id ||
    //     !req.body.customer_contact_id ||
    //     !req.body.booking_owner ||
    //     !req.body.check_in ||
    //     !req.body.check_out;

    const updateBooking = async (values) => {
        const loadingMessage = message.loading('In Progress...', 0);
        const newData = {
            ...values,
            check_in: dayjs(values.check_in).format('YYYY-MM-DD'),
            check_out: dayjs(values.check_out).format('YYYY-MM-DD'),
        };
        console.log('newData', newData);
        try {
            await axios.put(
                `${process.env.API_PATH}bookings/${params.id}`,
                newData
            );
            loadingMessage();
            message.success({
                content: 'Booking updated successfully!',
                duration: 4,
                icon: (
                    <CheckCircleTwoTone
                        twoToneColor="#52c41a"
                        style={{ fontSize: '16px' }}
                    />
                ),
            });
            router.push('/mango/bookings');
        } catch (error) {}
    };

    useEffect(() => {
        getBookingAtts();
    }, []);

    // For DatePicker settings
    const [arrivalDate, setArrivalDate] = useState(null);
    const [departureDatePickerOpen, setDepartureDatePickerOpen] =
        useState(false);

    const handleArrivalDateChange = (date) => {
        setArrivalDate(date);
        setDepartureDatePickerOpen(true);
    };

    const disabledDate = (current) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set current date to start of the day

        // Disable previous dates
        return current && current < currentDate;
    };

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        updateBooking(values);
        // createHome(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setError(errorInfo);
    };

    const handleCancelClick = () => {
        router.push('/mango/bookings');
    };

    if (error) {
        return <ErrorPage error={error} />;
        // alert(error.result.data.message);
    }

    return (
        <>
            {bookingAttributes.last_name && (
                <>
                    {console.log('ABC', bookingAttributes.last_name)}
                    <MainTitle
                        title={
                            <>
                                Edit Booking #{params.id} -{' '}
                                <span className="text-blue-800">
                                    {bookingAttributes.first_name}{' '}
                                    {bookingAttributes.last_name}
                                </span>
                            </>
                        }
                        description={`You can change booking information on the booking edit page here.`}
                    />

                    <Form
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                        className="p-6 flex flex-col gap-4 bg-white"
                        onFinish={onFinish} // Assign the onFinish callback
                        onFinishFailed={onFinishFailed} // Assign the onFinishFailed callback
                    >
                        <div className="flex gap-8 flex-col">
                            <div className="flex gap-8">
                                <div className="flex flex-col w-1/2">
                                    <span className="pb-2 font-medium">
                                        Home VS Name :
                                    </span>
                                    <span>
                                        {
                                            bookingAttributes.home_vs_name
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col w-1/2">
                                    <span className="pb-2 font-medium">
                                        Home Real Name :
                                    </span>
                                    <span>
                                        {
                                            bookingAttributes.home_real_name
                                        }
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-8">
                                <Form.Item
                                    name="check_in"
                                    label="Arrival Date"
                                    className="w-1/4 font-medium"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        className="font-medium"
                                        disabledDate={disabledDate}
                                        onChange={
                                            handleArrivalDateChange
                                        }
                                        defaultValue={dayjs(
                                            bookingAttributes.check_in
                                        )}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="check_out"
                                    label="Departure Date"
                                    className="w-1/4 font-medium"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        className="font-medium"
                                        disabledDate={(current) =>
                                            current &&
                                            current <= arrivalDate
                                        }
                                        onChange={() => {}}
                                        open={departureDatePickerOpen} // Set the open state based on departureDatePickerOpen
                                        onOpenChange={(open) =>
                                            setDepartureDatePickerOpen(
                                                open
                                            )
                                        } // Update departureDatePickerOpen state
                                        defaultPickerValue={
                                            arrivalDate
                                        } // Set the default value for the departure date picker
                                        defaultValue={dayjs(
                                            bookingAttributes.check_out
                                        )}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="booking_status"
                                    label="Booking Status"
                                    className="w-1/4 font-medium"
                                    initialValue={
                                        bookingAttributes.booking_status
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className="font-normal" />
                                </Form.Item>
                                <Form.Item
                                    name="booking_owner"
                                    label="Booking Owner"
                                    className="w-1/4 font-medium"
                                    initialValue={
                                        bookingAttributes.booking_owner
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input className="font-normal" />
                                </Form.Item>
                            </div>
                            <div className="flex gap-8">
                                <div className="flex flex-col w-1/4">
                                    <span className="pb-2 font-medium">
                                        First Name:
                                    </span>
                                    <span>
                                        {bookingAttributes.first_name}
                                    </span>
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <span className="pb-2 font-medium">
                                        Last Name:
                                    </span>
                                    <span>
                                        {bookingAttributes.last_name}
                                    </span>
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <span className="pb-2 font-medium">
                                        Email:
                                    </span>
                                    <span>
                                        {bookingAttributes.email}
                                    </span>
                                </div>
                                <div className="flex flex-col w-1/4">
                                    <span className="pb-2 font-medium">
                                        Phone:
                                    </span>
                                    <span>
                                        {bookingAttributes.phone}
                                    </span>
                                </div>
                            </div>

                            <div className="flex gap-8">
                                <Form.Item>
                                    <Space>
                                        <SubmitButton form={form} />
                                        <Button
                                            htmlType="button"
                                            onClick={
                                                handleCancelClick
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </>
            )}
        </>
    );
}
