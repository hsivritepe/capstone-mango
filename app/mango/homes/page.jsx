'use client';

import { Switch, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import MainTitle from '@/components/MainTitle/page';

import { SearchOutlined, HomeOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function Homes() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'home_id',
            width: 90,
            ellipsis: true,
            responsive: ['sm'],
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
            title: 'Home Real Name',
            dataIndex: 'home_real_name',
            key: '1',
            ellipsis: true,
            responsive: ['sm'],
            sorter: (a, b) =>
                a.home_real_name.localeCompare(b.home_real_name),
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
            title: 'Home Owner',
            key: 'home_owner',
            ellipsis: true,
            responsive: ['sm'],
            render: (text, record) => (
                <Link
                    href={`/mango/contacts/${record.ho_contact_id}`}
                    className="text-blue-800 font-medium"
                >
                    {record.first_name} {record.last_name}
                </Link>
            ),
            sorter: (a, b) =>
                a.first_name.localeCompare(b.first_name),
        },
    ];

    const [homes, setHomes] = useState([]);
    const [filteredHomes, setFilteredHomes] = useState([]);

    const getHomes = () => {
        axios
            .get(`${process.env.API_PATH}homes`)
            .then((response) => {
                console.log(response.data);
                setHomes(response.data);
                setFilteredHomes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getHomes();
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

        setFilteredHomes(filteredData);
    };

    useEffect(() => {
        setFilteredHomes(homes);
    }, [homes]);

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
                title="Homes"
                description="Here you can see the houses (villas) listed that are in the system."
                button={true}
                buttonLink="/mango/homes/add"
                buttonText="Add Home"
                icon={<HomeOutlined />}
            />
            <div className="text-right pr-8">
                <span className="font-semibold">Total:</span>{' '}
                {filteredHomes.length} homes
            </div>
            <Table
                columns={columnsWithSearch}
                dataSource={filteredHomes}
                scroll={{ x: true }}
                summary={() => <Table.Summary></Table.Summary>}
                sticky
                className="p-6"
            />
        </>
    );
}
