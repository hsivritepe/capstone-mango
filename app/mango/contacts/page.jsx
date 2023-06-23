'use client';

import { Switch, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import MainTitle from '@/components/MainTitle/page';

import { SearchOutlined, ContactsOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function Contacts() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 90,
            ellipsis: true,
            responsive: ['sm'],
            render: (text, record) => (
                <Link href={`/mango/contacts/${record.id}`}>
                    {text}
                </Link>
            ),
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
            ellipsis: true,
            responsive: ['sm'],
            sorter: (a, b) =>
                a.first_name.localeCompare(b.first_name),
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
            ellipsis: true,
            responsive: ['sm'],
            sorter: (a, b) => a.last_name.localeCompare(b.last_name),
        },
        {
            title: 'Email Address',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            responsive: ['sm'],
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
            ellipsis: true,
            responsive: ['sm'],
            sorter: (a, b) => a.id - b.id,
        },
    ];

    const [Contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);

    const getContacts = () => {
        axios
            .get(`${process.env.API_PATH}contacts`)
            .then((response) => {
                console.log(response.data);
                setContacts(response.data);
                setFilteredContacts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getContacts();
    }, []);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);

        const filteredData = Contacts.filter((record) => {
            const targetValue = record[dataIndex];
            if (targetValue) {
                return targetValue
                    .toString()
                    .toLowerCase()
                    .includes(selectedKeys[0].toLowerCase());
            }
            return false;
        });

        setFilteredContacts(filteredData);
    };

    useEffect(() => {
        setFilteredContacts(Contacts);
    }, [Contacts]);

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
                title="Contacts"
                description="Here you can see the contacts (people) listed that are in the system."
                button={true}
                buttonLink="/mango/contacts/add"
                buttonText="Add Contact"
                icon={<ContactsOutlined />}
            />
            <Table
                columns={columnsWithSearch}
                dataSource={filteredContacts}
                scroll={{ x: true }}
                summary={() => <Table.Summary></Table.Summary>}
                sticky
                className="p-6"
            />
        </>
    );
}
