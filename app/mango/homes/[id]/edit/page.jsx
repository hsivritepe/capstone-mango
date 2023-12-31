'use client';

import { useRouter } from 'next/navigation';
import MainTitle from '@/components/MainTitle/page';
import ErrorPage from '@/components/Error/page';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Space, Checkbox } from 'antd';
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
} from '@ant-design/icons';
import Link from 'next/link';

export default function EditHome({ params }) {
    const router = useRouter();

    const [existingAttributes, setExistingAttributes] = useState([]);
    const [homeAttributes, setHomeAttributes] = useState([]);

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

    const handleAttributeSelection = (attribute) => {
        const homeId = parseInt(params.id);
        const updatedSelectedAttributes = [...existingAttributes];
        const attributeIndex = updatedSelectedAttributes.findIndex(
            (attr) => attr.attribute_name === attribute.attribute_name
        );
        if (attributeIndex !== -1) {
            updatedSelectedAttributes.splice(attributeIndex, 1);
        } else {
            updatedSelectedAttributes.push({
                home_id: homeId,
                attribute_id: attribute.id,
                ...attribute,
            });
        }
        setExistingAttributes(updatedSelectedAttributes);
    };

    const handleSaveClick = async () => {
        const modifiedData = existingAttributes.map(
            ({
                attribute_name,
                ha_category_name,
                home_vs_name,
                id,
                ...rest
            }) => rest
        );

        try {
            const response = await axios.delete(
                `${process.env.API_PATH}homes/${params.id}/homeatts`
            );
        } catch (error) {
            return <ErrorPage error={error} />;
        }

        try {
            const response = await axios.post(
                `${process.env.API_PATH}homes/${params.id}/homeatts`,
                modifiedData
            );
            router.push(`/mango/homes/${params.id}`);
        } catch (error) {
            return <ErrorPage error={error} />;
        }
    };

    return (
        <>
            <MainTitle
                title={`Edit Home #${params.id} - ${existingAttributes[0]?.home_vs_name}`}
                description={`Display all home existingAttributes in their respective categories.`}
            />
            <div className="p-6">
                <button
                    onClick={handleSaveClick}
                    className="btn btn-secondary"
                >
                    SAVE
                </button>
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
                                                <Checkbox
                                                    checked={
                                                        isSelected !==
                                                        undefined
                                                    }
                                                    onChange={() =>
                                                        handleAttributeSelection(
                                                            attribute
                                                        )
                                                    }
                                                >
                                                    {
                                                        attribute.attribute_name
                                                    }
                                                </Checkbox>
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
