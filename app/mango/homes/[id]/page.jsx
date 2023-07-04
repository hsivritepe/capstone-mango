'use client';

import MainTitle from '@/components/MainTitle/page';
import Calendar from '@/components/Calendar/page';
import ErrorPage from '@/components/Error/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Space, Tabs } from 'antd';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
} from '@ant-design/icons';
import Link from 'next/link';
import BookingList from '@/components/BookingList/page';
import HomeImages from '@/components/HomeImages/page';

export default function Home({ params }) {
    const [existingAttributes, setExistingAttributes] = useState([]);
    const [homeAttributes, setHomeAttributes] = useState([]);
    const [calendarData, setCalendarData] = useState([]);

    const getHomeAtts = () => {
        axios
            .get(
                `${process.env.API_PATH}homes/${params.id}}/homeatts`
            )
            .then((response) => {
                setExistingAttributes(response.data);
            })
            .catch((error) => {
                return <ErrorPage error={error} />;
            });
    };

    const getAllAttributes = () => {
        axios
            .get(`${process.env.API_PATH}homeattributes`)
            .then((response) => {
                setHomeAttributes(response.data);
            });
    };

    const getCalendarData = async () => {
        try {
            const response = await axios.get(
                `${process.env.API_PATH}calendars/${params.id}`
            );
            setCalendarData(response.data);
        } catch (error) {
            return <ErrorPage error={error} />;
        }
    };

    useEffect(() => {
        getAllAttributes();
        getHomeAtts();
        getCalendarData();
    }, []);

    // Sort the array based on ha_category_id
    existingAttributes.sort(
        (a, b) => a.ha_category_id - b.ha_category_id
    );
    homeAttributes.sort(
        (a, b) => a.ha_category_id - b.ha_category_id
    );

    // Split the array into partial objects based on ha_category_name
    const homeAttsPartials = homeAttributes.reduce((acc, obj) => {
        const categoryName = obj.ha_category_name;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(obj);
        return acc;
    }, {});

    // Split the array into partial objects based on ha_category_name
    const homeExistingAttsPartials = existingAttributes.reduce(
        (acc, obj) => {
            const categoryName = obj.ha_category_name;
            if (!acc[categoryName]) {
                acc[categoryName] = [];
            }
            acc[categoryName].push(obj);
            return acc;
        },
        {}
    );

    const items = [
        {
            key: '1',
            label: `Home Details`,
            children: (
                <Row gutter={16} className="bg-gray-200 p-6 gap-y-5">
                    {Object.keys(homeAttsPartials).map(
                        (key, index) => (
                            <Col span={8} key={index}>
                                <Card title={key} bordered={false}>
                                    {homeAttsPartials[key].map(
                                        (attribute, index) => {
                                            const isSelected =
                                                homeExistingAttsPartials[
                                                    key
                                                ]?.find(
                                                    (
                                                        existingAttribute
                                                    ) =>
                                                        existingAttribute.attribute_name ===
                                                        attribute.attribute_name
                                                );
                                            return (
                                                <div key={index}>
                                                    <p>
                                                        {isSelected ? (
                                                            <Space>
                                                                <CheckCircleTwoTone
                                                                    twoToneColor="#52c41a"
                                                                    className="flex"
                                                                />
                                                                {
                                                                    attribute.attribute_name
                                                                }
                                                            </Space>
                                                        ) : (
                                                            <Space>
                                                                <CloseCircleTwoTone
                                                                    twoToneColor="lightgrey"
                                                                    className="flex"
                                                                />
                                                                <div className="text-gray-400">
                                                                    {
                                                                        attribute.attribute_name
                                                                    }
                                                                </div>
                                                            </Space>
                                                        )}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )}
                                </Card>
                            </Col>
                        )
                    )}
                    <Col span={24}>
                        <div className="p-6">
                            <Link
                                href={`/mango/homes/${params.id}/edit`}
                                className="btn btn-primary"
                            >
                                EDIT
                            </Link>
                        </div>
                    </Col>
                </Row>
            ),
        },
        {
            key: '2',
            label: `Bookings`,
            children: <BookingList home_id={params.id} />,
        },
        // {
        //     key: '3',
        //     label: `Calendar`,
        //     children: <Calendar calendarData={calendarData[0]?.id} />,
        // },
        // {
        //     key: '4',
        //     label: `Price`,
        //     children: `Content of Tab Pane 3`,
        // },
        {
            key: '3',
            label: `Images`,
            children: <HomeImages />,
        },
    ];

    return (
        <>
            <MainTitle
                title={
                    <>
                        Home #{params.id} -{' '}
                        <span className="text-blue-800">
                            {existingAttributes[0]?.home_vs_name}
                        </span>
                    </>
                }
                description={`Display all home existingAttributes in their respective categories.`}
            />
            <Tabs
                defaultActiveKey="1"
                items={items}
                type="card"
                className="p-6 bg-white"
            />
        </>
    );
}
