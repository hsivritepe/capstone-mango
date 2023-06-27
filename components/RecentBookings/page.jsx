'use client';

import { Switch, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import MainTitle from '@/components/MainTitle/page';

import { SearchOutlined, HomeOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function RecentBookings() {
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
            render: (booking_id, record) => (
                <Link
                    href={`/mango/bookings/${record.booking_id}`}
                    className="text-blue-800 font-medium"
                >
                    {booking_id}
                </Link>
            ),
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Home Sales Name',
            dataIndex: 'home_vs_name',
            key: 'home_vs_name',
            ellipsis: true,
            responsive: ['sm'],
            render: (name, record) => (
                <Link
                    href={`/mango/homes/${record.id}`}
                    className="text-blue-800 font-medium"
                >
                    {name}
                </Link>
            ),
            sorter: (a, b) =>
                a.home_vs_name.localeCompare(b.home_vs_name),
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
        {
            title: 'Created At',
            key: 'created_at',
            ellipsis: true,
            responsive: ['sm'],
            render: (text, record) => (
                <span>
                    {new Date(record.created_at).toLocaleString(
                        'en-US',
                        { dateStyle: 'short' }
                    )}
                </span>
            ),
            sorter: (a, b) =>
                a.created_at.localeCompare(b.created_at),
        },
    ];

    const [recentBookings, setRecentBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);

    const getRecentBookings = () => {
        axios
            .get(`${process.env.API_PATH}bookings/recent`)
            .then((response) => {
                console.log(response.data);
                setRecentBookings(response.data);
                setFilteredBookings(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getRecentBookings();
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);

        const filteredData = homes.filter((record) => {
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
        setFilteredBookings(recentBookings);
    }, [recentBookings]);

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
            <div className="text-lg font-medium px-6 pt-8">
                Recent Bookings
            </div>
            <Table
                columns={columnsWithSearch}
                dataSource={filteredBookings}
                scroll={{ x: true }}
                pagination={false}
                summary={() => <Table.Summary></Table.Summary>}
                sticky
                className="p-6"
            />
        </>
    );
}
