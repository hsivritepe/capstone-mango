// 'use client';

// import { SaveFilled } from '@ant-design/icons';
// import MainTitle from '@/components/MainTitle/page';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function AddHome({ params }) {
//     const [homeVsName, setHomeVsName] = useState('');
//     const [homeRealName, setHomeRealName] = useState('');
//     const [hoContactId, setHoContactId] = useState('');
//     const [destinationId, setDestinationId] = useState('');
//     const [destinations, setDestinations] = useState([]);

//     const isFormValid = () => {
//         // TO DO: Check if the fields are all filled
//         if (!homeVsName || !homeRealName || !hoContactId) {
//             return false;
//         }
//         return true;
//     };

//     const handleChangeHomeSalesName = (e) => {
//         setHomeVsName(e.target.value);
//     };

//     const handleChangeHomeRealName = (e) => {
//         setHomeRealName(e.target.value);
//     };

//     const handleChangeHoContactId = (e) => {
//         setHoContactId(e.target.value);
//     };

//     const handleChangeDestinationId = (e) => {
//         setDestinationId(e.target.value);
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         console.log('homeVsName', homeVsName);
//         console.log('homeRealName', homeRealName);
//     };

//     const getDestinations = async () => {
//         const response = await axios.get(
//             `${process.env.API_PATH}destinations`
//         );
//         console.log(response.data);
//         setDestinations(response.data);
//     };

//     useEffect(() => {
//         getDestinations();
//     }, []);

//     return (
//         <>
//             <MainTitle
//                 title={`Add Home`}
//                 description={`This form is used to add/create a new home.`}
//                 icon={<SaveFilled />}
//                 button={true}
//                 buttonText={`Save`}
//                 buttonLink={`/mango/bookings`}
//             />
//             <div className="addHomeForm">
//                 <form onSubmit={handleFormSubmit}>
//                     <h2>Add home form</h2>
//                     <label>
//                         home Sales Name:{' '}
//                         <input
//                             name="homeVsName"
//                             type="text"
//                             onChange={handleChangeHomeSalesName}
//                         />
//                     </label>
//                     <label>
//                         home Real Name:{' '}
//                         <input
//                             name="homeRealName"
//                             type="homeRealName"
//                             onChange={handleChangeHomeRealName}
//                         />
//                     </label>
//                     <label>
//                         HO Contact Name{' '}
//                         <input
//                             name="hoContactId"
//                             type="hoContactId"
//                             onChange={handleChangeHoContactId}
//                         />
//                     </label>
//                     <label>
//                         Destination Name
//                         <select
//                             name="destinationId"
//                             onChange={handleChangeDestinationId}
//                         >
//                             <option value="">
//                                 Select a destination
//                             </option>
//                             {destinations.map((destination) => (
//                                 <option
//                                     key={destination.id}
//                                     value={destination.destination_id}
//                                 >
//                                     {destination.destination_name}
//                                 </option>
//                             ))}
//                         </select>
//                     </label>
//                     <button
//                         type="submit"
//                         className="btn"
//                         disabled={!isFormValid()}
//                     >
//                         Sign up
//                     </button>
//                 </form>
//             </div>
//         </>
//     );
// }

'use client';

import { SaveFilled } from '@ant-design/icons';
import MainTitle from '@/components/MainTitle/page';
import ErrorPage from '@/components/Error/page';
import Link from 'next/link';
import axios from 'axios';
import { Button, Form, Input, Space, Switch, Select } from 'antd';
import { useState, useEffect } from 'react';

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

    const getDestinations = async () => {
        const response = await axios.get(
            `${process.env.API_PATH}destinations`
        );
        console.log(response.data);
        setDestinations(response.data);
    };

    const getContacts = async () => {
        const response = await axios.get(
            `${process.env.API_PATH}contacts`
        );
        console.log(response.data);
        setContacts(response.data);
    };

    const createHome = async (values) => {
        try {
            const response = await axios.post(
                `${process.env.API_PATH}homes`,
                values
            );
            console.log(response.data);
        } catch (error) {
            console.log('error', error);
            setError(error);
        }
    };

    useEffect(() => {
        getDestinations();
        getContacts();
    }, []);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        createHome(values);

        // Handle the form submission here (e.g., send data to the server)
        // You can make an API call using axios or perform any other necessary operations
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if (error) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            <MainTitle
                title={`Add Home`}
                description={`This form is used to add/create a new home.`}
                icon={<SaveFilled />}
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
