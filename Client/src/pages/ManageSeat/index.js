import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageSeat.module.scss';

const cx = classNames.bind(styles);

const initialSeats = [
    { id: 1, seatNumber: 'A1', status: 'Chưa đặt' },
    { id: 2, seatNumber: 'A2', status: 'Đã đặt' },
    { id: 3, seatNumber: 'A3', status: 'Bảo trì' },
    // Add more initial seat data here
];

function ManageSeat() {
    const [seats, setSeats] = useState(initialSeats);
    const [filteredSeats, setFilteredSeats] = useState(initialSeats);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = seats.filter(
            (seat) => seat.seatNumber.toLowerCase().includes(term) || seat.status.toLowerCase().includes(term),
        );
        setFilteredSeats(filtered);
    };

    const handleStatusUpdate = (id, newStatus) => {
        const updatedSeats = seats.map((seat) => (seat.id === id ? { ...seat, status: newStatus } : seat));
        setSeats(updatedSeats);
        setFilteredSeats(updatedSeats);
    };

    return (
        <div className={cx('manage-seat')}>
            <h2 className={cx('header')}>Manage Seats</h2>
            <div className={cx('search-bar')}>
                <input
                    type="text"
                    placeholder="Search seats..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={cx('search-input')}
                />
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Seat Number</th>
                        <th className={cx('th')}>Status</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredSeats.map((seat) => (
                        <tr key={seat.id}>
                            <td className={cx('td')}>{seat.seatNumber}</td>
                            <td
                                className={cx('td', {
                                    'status-reserved': seat.status === 'Đã đặt',
                                    'status-maintenance': seat.status === 'Bảo trì',
                                })}
                            >
                                {seat.status}
                            </td>
                            <td className={cx('td')}>
                                <button
                                    className={cx('button')}
                                    onClick={() => handleStatusUpdate(seat.id, 'Chưa đặt')}
                                >
                                    Chưa đặt
                                </button>
                                <button className={cx('button')} onClick={() => handleStatusUpdate(seat.id, 'Đã đặt')}>
                                    Đã đặt
                                </button>
                                <button className={cx('button')} onClick={() => handleStatusUpdate(seat.id, 'Bảo trì')}>
                                    Bảo trì
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageSeat;
