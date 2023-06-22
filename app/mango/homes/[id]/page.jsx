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

export default function Home({ params }) {
    const [existingAttributes, setExistingAttributes] = useState([]);
    const [homeAttributes, setHomeAttributes] = useState([]);

    const getHomeAtts = () => {
        axios
            .get(
                `${process.env.API_PATH}homes/${params.id}}/homeatts`
            )
            .then((response) => {
                // console.log(response.data);
                setExistingAttributes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllAttributes = () => {
        axios
            .get(`${process.env.API_PATH}homeattributes`)
            .then((response) => {
                // console.log('all attributes', response.data);
                setHomeAttributes(response.data);
            });
    };
    useEffect(() => {
        getAllAttributes();
        getHomeAtts();
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

    console.log('homeattpartials', homeAttsPartials);

    // Print the sorted array
    // console.log(existingAttributes);

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

    console.log('homeAttsExisting', homeExistingAttsPartials);

    return (
        <>
            <MainTitle
                title={`Home #${params.id} - ${existingAttributes[0]?.home_vs_name}`}
                description={`Display all home existingAttributes in their respective categories.`}
            />
            <div className="p-6">
                <Link
                    href={`/mango/homes/${params.id}/edit`}
                    className="btn btn-primary"
                >
                    EDIT
                </Link>
            </div>
            <Row gutter={16} className="bg-gray-200 p-6 gap-y-5">
                {Object.keys(homeAttsPartials).map((key, index) => (
                    <Col span={8} key={index}>
                        <Card title={key} bordered={false}>
                            {homeAttsPartials[key].map(
                                (attribute, index) => {
                                    const isSelected =
                                        homeExistingAttsPartials[
                                            key
                                        ]?.find(
                                            (existingAttribute) =>
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
                ))}
            </Row>
        </>
    );
}
