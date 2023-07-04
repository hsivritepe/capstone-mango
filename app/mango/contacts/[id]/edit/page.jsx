'use client';

import MainTitle from '@/components/MainTitle/page';
import ErrorPage from '@/components/Error/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Card,
    Col,
    Row,
    Space,
    Form,
    Input,
    Button,
    message,
} from 'antd';
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
            Save
        </Button>
    );
};

export default function EditContact({ params }) {
    const [contactAttributes, setContactAttributes] = useState({});
    const [error, setError] = useState(null);
    const router = useRouter();

    const getContactAtts = () => {
        axios
            .get(`${process.env.API_PATH}contacts/${params.id}}`)
            .then((response) => {
                setContactAttributes(response.data[0]);
            })
            .catch((error) => {
                return <ErrorPage error={error} />;
            });
    };

    const updateContact = async (values) => {
        const loadingMessage = message.loading('In Progress...', 0);
        try {
            await axios.put(
                `${process.env.API_PATH}contacts/${params.id}`,
                values
            );
            loadingMessage();
            message.success({
                content: 'Contact updated successfully!',
                duration: 4,
                icon: (
                    <CheckCircleTwoTone
                        twoToneColor="#52c41a"
                        style={{ fontSize: '16px' }}
                    />
                ),
            });
            router.push('/mango/contacts');
        } catch (error) {}
    };

    useEffect(() => {
        getContactAtts();
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        updateContact(values);
    };

    const onFinishFailed = (errorInfo) => {
        setError(errorInfo);
    };

    const handleCancelClick = () => {
        router.push('/mango/contacts');
    };

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            {contactAttributes.last_name && (
                <>
                    <MainTitle
                        title={
                            <>
                                Edit Contact #{params.id} -{' '}
                                <span className="text-blue-800">
                                    {contactAttributes.first_name}{' '}
                                    {contactAttributes.last_name}
                                </span>
                            </>
                        }
                        description={`You can change contact information on the contact edit page here.`}
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
                                    name="first_name"
                                    label="Contact First Name"
                                    className="w-1/2"
                                    initialValue={
                                        contactAttributes.first_name
                                    }
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <>
                                    <Form.Item
                                        name="last_name"
                                        label="Contact Last Name"
                                        className="w-1/2"
                                        initialValue={
                                            contactAttributes.last_name
                                        }
                                        rules={[
                                            {
                                                required: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </>
                            </div>
                            <div className="flex gap-8">
                                <Form.Item
                                    name="email"
                                    label="Contact Email"
                                    className="w-1/2"
                                    initialValue={
                                        contactAttributes.email
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
                                    label="Contact Phone Number"
                                    className="w-1/2"
                                    initialValue={
                                        contactAttributes.phone
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
                            <Form.Item>
                                <Space>
                                    <SubmitButton form={form} />
                                    <Button
                                        htmlType="button"
                                        onClick={handleCancelClick}
                                    >
                                        Cancel
                                    </Button>
                                </Space>
                            </Form.Item>
                        </div>
                    </Form>
                </>
            )}

            {/*

                            <p>
                                <strong>First Name:</strong>{' '}
                                {contactAttributes.first_name}
                            </p>
                            <p>
                                <strong>Last Name:</strong>{' '}
                                {contactAttributes.last_name}
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                {contactAttributes.email}
                            </p>
                            <p>
                                <strong>Phone:</strong>{' '}
                                {contactAttributes.phone}
                            </p> */}
        </>
    );
}
