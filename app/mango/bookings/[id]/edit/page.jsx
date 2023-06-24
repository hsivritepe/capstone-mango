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

    const updateBooking = async (values) => {
        const loadingMessage = message.loading('In Progress...', 0);
        try {
            await axios.put(
                `${process.env.API_PATH}bookings/${params.id}`,
                values
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
                        title={`Edit Booking #${params.id}`}
                        description={`You can change booking information on the booking edit page here.`}
                    />

                    <Form
                        form={form}
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                        className="p-6 flex flex-col gap-4"
                        onFinish={onFinish} // Assign the onFinish callback
                        onFinishFailed={onFinishFailed} // Assign the onFinishFailed callback
                    >
                        <div className="flex gap-8 flex-col">
                            <div className="flex gap-8">
                                <Form.Item
                                    name="home_vs_name"
                                    label="Home VS Name"
                                    className="w-1/2"
                                    initialValue={
                                        bookingAttributes.home_vs_name
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="home_real_name"
                                    label="Home Real Name"
                                    className="w-1/2"
                                    initialValue={
                                        bookingAttributes.home_real_name
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="flex gap-8">
                                <Form.Item
                                    name="check_in"
                                    label="Arrival Date"
                                    className="w-1/4"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker
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
                                    className="w-1/4"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <DatePicker
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
                                    className="w-1/4"
                                    initialValue={
                                        bookingAttributes.booking_status
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="booking_owner"
                                    label="Booking Owner"
                                    className="w-1/4"
                                    initialValue={
                                        bookingAttributes.booking_owner
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="flex gap-8">
                                <Form.Item
                                    name="first_name"
                                    label="First Name"
                                    className="w-1/4"
                                    initialValue={
                                        bookingAttributes.first_name
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="last_name"
                                    label="Last Name"
                                    className="w-1/4"
                                    initialValue={
                                        bookingAttributes.last_name
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label="Email"
                                    className="w-1/4"
                                    initialValue={
                                        bookingAttributes.email
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    label="Phone"
                                    className="w-1/4"
                                    initialValue={
                                        bookingAttributes.phone
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
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
