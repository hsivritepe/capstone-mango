'use client';

import { SaveFilled } from '@ant-design/icons';
import MainTitle from '@/components/MainTitle/page';
import ErrorPage from '@/components/Error/page';
import Link from 'next/link';
import axios from 'axios';
import {
    Button,
    Form,
    Input,
    Space,
    Switch,
    Select,
    Alert,
    DatePicker,
    message,
} from 'antd';
const { RangePicker } = DatePicker;
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SubmitButton = ({ form }) => {
    const [submittable, setSubmittable] = useState(false);

    // Watch all values
    const values = Form.useWatch([], form);
    useEffect(() => {
        form.validateFields({
            validateOnly: true,
        }).then(
            () => {
                setSubmittable(true);
            },
            () => {
                console.log('values', values);
                setSubmittable(false);
            }
        );
    }, [values]);
    return (
        <Button
            type="primary"
            htmlType="submit"
            disabled={!submittable}
        >
            Submit
        </Button>
    );
};

export default function BookingAdd() {
    const [homes, setHomes] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    const getContacts = async () => {
        const response = await axios.get(
            `${process.env.API_PATH}contacts`
        );
        console.log(response.data);
        setContacts(response.data);
    };

    const getHomes = async () => {
        try {
            const response = await axios.get(
                `${process.env.API_PATH}homes`
            );
            console.log(response.data);
            setHomes(response.data);
        } catch (error) {
            console.log('error', error);
            setError(error);
        }
    };

    const createBooking = async (values) => {
        const loadingMessage = message.loading('In Progress...', 0);
        const newData = {
            ...values,
            home_id: parseInt(values.home_id),
            customer_contact_id: parseInt(values.customer_contact_id),
            user_id: 1,
            check_in: values.check_in.format('YYYY-MM-DD'),
            check_out: values.check_out.format('YYYY-MM-DD'),
        };
        console.log('newData', newData);
        try {
            const response = await axios.post(
                `${process.env.API_PATH}bookings`,
                newData
            );
            console.log(response.data);
            router.push('/mango/bookings');
        } catch (error) {
            console.log('error', error);
            setError(error);
        }
        loadingMessage();
        message.success('Success');
    };

    useEffect(() => {
        getHomes();
        getContacts();
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
        createBooking(values);
        // createHome(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setError(errorInfo);
    };

    if (error) {
        return <ErrorPage error={error} />;
        // alert(error.result.data.message);
    }

    return (
        <>
            <MainTitle
                title={`Add Booking`}
                description={`This form is used to add/create a new booking.`}
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
                <div className="flex gap-8">
                    <Form.Item
                        name="home_id"
                        label="Home Sales Name"
                        className="w-1/2"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a home"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {homes.map((home) => (
                                <Select.Option
                                    key={home.id}
                                    value={home.home_id}
                                    label={home.home_vs_name}
                                >
                                    {home.home_vs_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="customer_contact_id"
                        label="Customer Contact Name"
                        className="w-1/2"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '')
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {contacts.map((contact) => (
                                <Select.Option
                                    key={contact.id}
                                    value={contact.ho_contact_id}
                                    label={`${contact.first_name} ${contact.last_name}`}
                                >
                                    {`${contact.first_name} ${contact.last_name}`}
                                </Select.Option>
                            ))}
                        </Select>
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
                            onChange={handleArrivalDateChange}
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
                                current && current <= arrivalDate
                            }
                            onChange={() => {}}
                            open={departureDatePickerOpen} // Set the open state based on departureDatePickerOpen
                            onOpenChange={(open) =>
                                setDepartureDatePickerOpen(open)
                            } // Update departureDatePickerOpen state
                            defaultPickerValue={arrivalDate} // Set the default value for the departure date picker
                        />
                    </Form.Item>
                    <Form.Item
                        name="booking_owner"
                        label="Booking Owner"
                        className="w-1/3"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a home"
                            defaultValue="vs"
                        >
                            <Select.Option
                                key="1"
                                value="vs"
                                label="Agency A"
                                checked
                            >
                                Agency A
                            </Select.Option>
                            <Select.Option
                                key="2"
                                value="ho"
                                label="Home Owner"
                            >
                                Home Owner
                            </Select.Option>
                            <Select.Option
                                key="3"
                                value="agB"
                                label="Agency B"
                            >
                                Agency B
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="booking_status"
                        label="Booking Status"
                        className="w-1/3"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a status"
                            defaultValue="Final Booking"
                        >
                            <Select.Option
                                key="1"
                                value="fb"
                                label="Final Booking"
                                checked
                            >
                                Final Booking
                            </Select.Option>
                            <Select.Option
                                key="2"
                                value="rs"
                                label="Reserved"
                            >
                                Reserved
                            </Select.Option>
                            <Select.Option
                                key="3"
                                value="inq"
                                label="Inquiry"
                            >
                                Inquiry
                            </Select.Option>
                        </Select>
                    </Form.Item>
                </div>

                <Form.Item>
                    <Space>
                        <SubmitButton form={form} />
                        <Button htmlType="reset">Reset</Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
}
