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
} from 'antd';
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

export default function HomeAdd() {
    const [destinations, setDestinations] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();

    const getDestinations = async () => {
        const response = await axios.get(
            `${process.env.API_PATH}destinations`
        );
        setDestinations(response.data);
    };

    const getContacts = async () => {
        const response = await axios.get(
            `${process.env.API_PATH}contacts`
        );
        setContacts(response.data);
    };

    const createHome = async (values) => {
        try {
            const response = await axios.post(
                `${process.env.API_PATH}homes`,
                values
            );
            router.push(`/mango/homes`);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        getDestinations();
        getContacts();
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        createHome(values);
    };

    const onFinishFailed = (errorInfo) => {
        return <ErrorPage error={errorInfo} />;
    };

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            <MainTitle
                title={`Add Home`}
                description={`This form is used to add/create a new home.`}
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
                <div className="flex gap-8">
                    <Form.Item
                        name="home_vs_name"
                        label="Home Sales Name"
                        className="w-1/2"
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
                        name="ho_contact_id"
                        label="HO Contact Name"
                        className="w-1/3"
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

                    <Form.Item
                        name="destination_id"
                        label="Destination Name"
                        className="w-1/3"
                    >
                        <Select
                            defaultValue="Select a destination"
                            style={
                                {
                                    // width: 120,
                                }
                            }
                        >
                            {destinations.map((destination) => (
                                <Select.Option
                                    key={destination.id}
                                    value={destination.destination_id}
                                >
                                    {destination.destination_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="is_open_for_sale"
                        label="Open For Sale"
                        className="w-1/3"
                    >
                        <Switch defaultChecked />
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
