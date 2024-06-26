import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SchedulesStaff.module.scss';

const cx = classNames.bind(styles);

const initialSchedules = [
    {
        id: 1,
        date: '2024-06-16',
        shift: 'Morning',
        task: 'Check tickets',
        status: 'Pending',
        shiftTime: '08:00 - 12:00',
    },
    {
        id: 2,
        date: '2024-06-17',
        shift: 'Afternoon',
        task: 'Handle bookings',
        status: 'Pending',
        shiftTime: '13:00 - 17:00',
    },
    // Add more initial schedule data here
];

function SchedulesStaff() {
    const [schedules, setSchedules] = useState(initialSchedules);

    const handleCheckIn = (id) => {
        setSchedules(
            schedules.map((schedule) => (schedule.id === id ? { ...schedule, status: 'Checked-in' } : schedule)),
        );
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('header')}>Staff Work Schedule</h2>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Date</th>
                        <th className={cx('th')}>Shift</th>
                        <th className={cx('th')}>Task</th>
                        <th className={cx('th')}>Shift Time</th>
                        <th className={cx('th')}>Status</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td className={cx('td')}>{schedule.date}</td>
                            <td className={cx('td', 'shift')}>{schedule.shift}</td>
                            <td className={cx('td', 'task')}>{schedule.task}</td>
                            <td className={cx('td', 'shiftTime')}>{schedule.shiftTime}</td>
                            <td className={cx('td', 'status')}>{schedule.status}</td>
                            <td className={cx('td')}>
                                <div className={cx('actions')}>
                                    <button
                                        className={cx('checkInButton')}
                                        onClick={() => handleCheckIn(schedule.id)}
                                        disabled={schedule.status === 'Checked-in'}
                                    >
                                        Check In
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SchedulesStaff;
