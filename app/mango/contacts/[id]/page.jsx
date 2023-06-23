'use client';

import MainTitle from '@/components/MainTitle/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Space } from 'antd';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
} from '@ant-design/icons';
import Link from 'next/link';

export default function ShowContact({ params }) {
    const [contactAttributes, setContactAttributes] = useState([]);

    const getContactAtts = () => {
        axios
            .get(`${process.env.API_PATH}contacts/${params.id}}`)
            .then((response) => {
                console.log('contact', response.data[0]);
                setContactAttributes(response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getContactAtts();
    }, []);

    return (
        <>
            <MainTitle
                title={`Contact #${params.id} - ${contactAttributes.first_name} ${contactAttributes.last_name}`}
                description={`Display all contact information.`}
            />
            <div className="p-6">
                <Link
                    href={`/mango/contacts/${params.id}/edit`}
                    className="btn btn-primary"
                >
                    EDIT
                </Link>
            </div>
            <Row gutter={16} className="bg-gray-200 p-6 gap-y-5">
                <Col span={12}>
                    <Card title="Contact Information">
                        <Space direction="vertical">
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
                            </p>
                        </Space>
                    </Card>
                </Col>
            </Row>
        </>
    );
}
