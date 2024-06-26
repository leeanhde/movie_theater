import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageShowtime.module.scss';

const cx = classNames.bind(styles);

const initialShowtimes = [
    { id: 1, movieName: 'Movie A', theater: 'Theater 1', showTime: '10:00 AM', showDate: '2024-06-15' },
    { id: 2, movieName: 'Movie B', theater: 'Theater 2', showTime: '13:00 PM', showDate: '2024-06-15' },
    // Add more initial showtime data here
];

function ManageShowtime() {
    const [showtimes, setShowtimes] = useState(initialShowtimes);
    const [filteredShowtimes, setFilteredShowtimes] = useState(initialShowtimes);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = showtimes.filter(
            (showtime) =>
                showtime.movieName.toLowerCase().includes(term) ||
                showtime.theater.toLowerCase().includes(term) ||
                showtime.showTime.toLowerCase().includes(term) ||
                showtime.showDate.toLowerCase().includes(term),
        );
        setFilteredShowtimes(filtered);
    };

    const handleDelete = (id) => {
        const updatedShowtimes = showtimes.filter((showtime) => showtime.id !== id);
        setShowtimes(updatedShowtimes);
        setFilteredShowtimes(updatedShowtimes);
    };

    return (
        <div className={cx('manage-showtime')}>
            <h2 className={cx('header')}>Manage Showtimes</h2>
            <div className={cx('search-bar')}>
                <input
                    type="text"
                    placeholder="Search showtimes..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={cx('search-input')}
                />
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Movie Name</th>
                        <th className={cx('th')}>Theater</th>
                        <th className={cx('th')}>Show Time</th>
                        <th className={cx('th')}>Show Date</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShowtimes.map((showtime) => (
                        <tr key={showtime.id}>
                            <td className={cx('td')}>{showtime.movieName}</td>
                            <td className={cx('td')}>{showtime.theater}</td>
                            <td className={cx('td')}>{showtime.showTime}</td>
                            <td className={cx('td')}>{showtime.showDate}</td>
                            <td className={cx('td')}>
                                <button
                                    className={cx('button', 'edit-button')}
                                    onClick={() => console.log(`Edit showtime ${showtime.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={cx('button', 'delete-button')}
                                    onClick={() => handleDelete(showtime.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('add-showtime-button-container')}>
                <button className={cx('button', 'add-showtime-button')} onClick={() => console.log('Add new showtime')}>
                    Add Showtime
                </button>
            </div>
        </div>
    );
}

export default ManageShowtime;
