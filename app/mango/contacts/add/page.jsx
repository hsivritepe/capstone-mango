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
    message,
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

export default function ContactAdd() {
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

    const createContact = async (values) => {
        const loadingMessage = message.loading('In Progress...', 0);
        try {
            const response = await axios.post(
                `${process.env.API_PATH}contacts`,
                values
            );
            console.log(response.data);
            loadingMessage();
            message.success('Success');
            router.push(`/mango/contacts`);
        } catch (error) {
            console.log('error', error);
            setError(error);
        }
    };

    useEffect(() => {
        getContacts();
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        createContact(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (error) {
        return <ErrorPage error={error} />;
        // alert(error.result.data.message);
    }

    return (
        <>
            <MainTitle
                title={`Add Contact`}
                description={`This form is used to add/create a new contact.`}
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
                        name="first_name"
                        label="Contact First Name"
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
                        name="last_name"
                        label="Contact Last Name"
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
                        name="email"
                        label="Email Address"
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
                        name="phone"
                        label="Phone Number"
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
