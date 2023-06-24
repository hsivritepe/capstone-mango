import { Table, Typography } from 'antd';

export default function Calendar({ props }) {
    console.log('calendar data', props);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const year = 2023;
    const calendarData = [];

    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysArray = Array.from(
            { length: daysInMonth },
            (_, i) => i + 1
        );
        calendarData.push({ month: months[month], days: daysArray });
    }

    const { Column } = Table;
    const { Text } = Typography;

    return (
        <Table
            dataSource={calendarData}
            pagination={false}
            bordered
            id="calendar"
            rowKey={(record) => record.month}
        >
            <Column
                title="Month"
                dataIndex="month"
                key="month"
                render={(text) => <Text strong>{text}</Text>}
            />
            {calendarData[0]?.days.map((day, index) => (
                <Column
                    title={`${day}`}
                    dataIndex={`days[${index}]`}
                    key={`day-${index}`}
                    render={(text, record) => (
                        <Text>{`${year}-${(
                            months.indexOf(record.month) + 1
                        )
                            .toString()
                            .padStart(2, '0')}-${
                            record.days[index]
                        }`}</Text>
                    )}
                />
            ))}
        </Table>
    );
}
