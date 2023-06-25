'use client';

import { Switch, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import MainTitle from '@/components/MainTitle/page';

import { SearchOutlined, CalendarOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function Bookings() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const columns = [
        {
            title: 'ID',
            dataIndex: 'booking_id',
            key: 'booking_id',
            width: 90,
            ellipsis: true,
            responsive: ['sm'],
            render: (name, record) => (
                <Link href={`/mango/bookings/${record.id}`}>
                    {name}
                </Link>
            ),
            sorter: (a, b) => a.booking_id - b.booking_id,
        },
        {
            title: 'House Name',
            dataIndex: 'home_vs_name',
            key: 'home_vs_name',
            ellipsis: true,
            responsive: ['sm'],
            render: (name, record) => (
                <Link href={`/mango/homes/${record.home_id}`}>
                    {name}
                </Link>
            ),
            sorter: (a, b) =>
                a.home_vs_name.localeCompare(b.home_vs_name),
        },
        {
            title: 'Check In',
            dataIndex: 'check_in',
            key: 'check_in',
            ellipsis: true,
            responsive: ['sm'],
            render: (text, record) => (
                <span>
                    {new Date(record.check_in).toLocaleString(
                        'en-US',
                        { dateStyle: 'short' }
                    )}
                </span>
            ),
            sorter: (a, b) => a.check_in.localeCompare(b.check_in),
        },
        {
            title: 'Check Out',
            dataIndex: 'check_out',
            key: 'check_out',
            ellipsis: true,
            responsive: ['sm'],
            render: (text, record) => (
                <span>
                    {new Date(record.check_out).toLocaleString(
                        'en-US',
                        { dateStyle: 'short' }
                    )}
                </span>
            ),
            sorter: (a, b) => a.check_out.localeCompare(b.check_out),
        },
        {
            title: 'Customer Name',
            key: 'customer name',
            ellipsis: true,
            responsive: ['sm'],
            render: (text, record) => (
                <span>
                    {record.first_name} {record.last_name}
                </span>
            ),
            sorter: (a, b) =>
                a.first_name.localeCompare(b.first_name),
        },
        {
            title: 'Dest Name',
            dataIndex: 'destination_name',
            key: 'destination_name',
            ellipsis: true,
            responsive: ['sm'],
            sorter: (a, b) =>
                a.destination_name.localeCompare(b.destination_name),
        },
    ];

    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    const getBookings = () => {
        axios
            .get(`${process.env.API_PATH}bookings`)
            .then((response) => {
                console.log(response.data);
                setBookings(response.data);
                setFilteredBookings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getBookings();
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);

        const filteredData = bookings.filter((record) => {
            const targetValue = record[dataIndex];
            if (targetValue) {
                return targetValue
                    .toString()
                    .toLowerCase()
                    .includes(selectedKeys[0].toLowerCase());
            }
            return false;
        });

        setFilteredBookings(filteredData);
    };

    useEffect(() => {
        setFilteredBookings(bookings);
    }, [bookings]);

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Search
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(
                            e.target.value ? [e.target.value] : []
                        )
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        width: 188,
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <button
                        type="button"
                        onClick={() => handleReset(clearFilters)}
                        style={{ width: 90 }}
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            handleSearch(
                                selectedKeys,
                                confirm,
                                dataIndex
                            )
                        }
                        style={{ width: 90 }}
                    >
                        Search
                    </button>
                </div>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
    });

    const columnsWithSearch = columns.map((col) => {
        if (col.dataIndex) {
            return {
                ...col,
                ...getColumnSearchProps(col.dataIndex),
                key: col.key, // Add the key prop here
            };
        }
        return col;
    });

    return (
        <>
            <MainTitle
                title="Bookings"
                description="Here you can see the bookings (reservations) listed that are in the system."
                button={true}
                buttonLink="/mango/bookings/add"
                buttonText="Add Booking"
                icon={<CalendarOutlined />}
            />
            <Table
                columns={columnsWithSearch}
                dataSource={filteredBookings}
                scroll={{ x: true }}
                summary={() => <Table.Summary></Table.Summary>}
                sticky
                className="p-6 bg-white"
            />
        </>
    );
}
