import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageShowtime.module.scss';
import { useNavigate } from 'react-router-dom';
import * as scheduleService from '~/services/scheduleService';
const cx = classNames.bind(styles);

function ManageShowtime() {
    const [searchTerm, setSearchTerm] = useState('');
    const [schedule, setSchedule] = useState([]);
    const [filteredShowtimes, setFilteredShowtimes] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMoviesNowShowing = async () => {
            try {
                setIsLoading(true);
                const schedule = await scheduleService.listSchedule();
                console.log('Fetched schedule:', schedule);
                setSchedule(schedule);
                setFilteredShowtimes(schedule); // Set initial filtered data to all schedule items
                setError(null);
            } catch (error) {
                console.error('Error fetching schedule:', error);
                setError('Failed to load schedule. Please try again later.');
                setSchedule([]);
                setFilteredShowtimes([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoviesNowShowing();
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = schedule.filter((showtime) => {
            const {
                movieId: { movieNameEnglish },
                cinemaRoomId: { cinemaRoomName },
                scheduleTime,
                fromDate,
                toDate,
            } = showtime;

            return (
                movieNameEnglish.toLowerCase().includes(term) ||
                cinemaRoomName.toLowerCase().includes(term) ||
                scheduleTime.some((time) => new Date(time).toLocaleString().toLowerCase().includes(term)) ||
                new Date(fromDate).toLocaleDateString().toLowerCase().includes(term) ||
                new Date(toDate).toLocaleDateString().toLowerCase().includes(term)
            );
        });
        setFilteredShowtimes(filtered);
    };

    const handleDelete = (id) => {
        const updatedShowtimes = schedule.filter((showtime) => showtime._id !== id);
        setSchedule(updatedShowtimes);
        setFilteredShowtimes(updatedShowtimes);
    };

    if (isLoading) {
        return <div className={cx('loading')}>Loading movies...</div>;
    }

    if (error) {
        return <div className={cx('error')}>{error}</div>;
    }

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
                        <th className={cx('th')}>Room</th>
                        <th className={cx('th')}>Show Time</th>
                        <th className={cx('th')}>Show Date</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShowtimes.map((showtime) => (
                        <tr key={showtime._id}>
                            <td className={cx('td')}>{showtime.movieId.movieNameEnglish}</td>
                            <td className={cx('td')}>{showtime.cinemaRoomId.cinemaRoomName}</td>
                            <td className={cx('td')}>
                                {showtime.scheduleTime.map((time, index) => (
                                    <span key={index}>{new Date(time).toLocaleString()}</span>
                                ))}
                            </td>
                            <td className={cx('td')}>
                                {new Date(showtime.fromDate).toLocaleString()} - {' '}
                                {new Date(showtime.toDate).toLocaleString()}
                            </td>
                            <td className={cx('td')}>
                                <button
                                    className={cx('button', 'edit-button')}
                                    onClick={() => console.log(`Edit showtime ${showtime._id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={cx('button', 'delete-button')}
                                    onClick={() => handleDelete(showtime._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('add-showtime-button-container')}>
                <button
                    className={cx('button', 'add-showtime-button')}
                    onClick={() => console.log('Add new showtime')}
                >
                    Add Showtime
                </button>
            </div>
        </div>
    );
}

export default ManageShowtime;
