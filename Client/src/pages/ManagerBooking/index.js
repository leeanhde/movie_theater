import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManagerBooking.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const initialMovies = [
    {
        id: 1,
        name: 'Movie A',
        showTime: '2024-06-15 10:00 AM',
        duration: '2 hours',
        theater: 'Theater 1',
        availableSeats: 50,
        showDate: '2024-06-15',
    },
    {
        id: 2,
        name: 'Movie B',
        showTime: '2024-06-15 13:00 PM',
        duration: '1.5 hours',
        theater: 'Theater 2',
        availableSeats: 30,
        showDate: '2024-06-15',
    },
    // Add more initial movie data here
];

function ManageBooking() {
    const [movies, setMovies] = useState(initialMovies);
    const navigate = useNavigate();

    const handleBookTickets = (movie) => {
        navigate('/showtime/bookingseat', {
            state: { movieTitle: movie.name, time: movie.showTime, showDate: movie.showDate },
        });
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('header')}>Manage Movie Bookings</h2>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Movie Name</th>
                        <th className={cx('th')}>Show Time</th>
                        <th className={cx('th')}>Duration</th>
                        <th className={cx('th')}>Theater</th>
                        <th className={cx('th')}>Available Seats</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td className={cx('td')}>{movie.name}</td>
                            <td className={cx('td')}>{movie.showTime}</td>
                            <td className={cx('td')}>{movie.duration}</td>
                            <td className={cx('td')}>{movie.theater}</td>
                            <td className={cx('td')}>{movie.availableSeats}</td>
                            <td className={cx('td')}>
                                <button
                                    className={cx('button')}
                                    onClick={() => handleBookTickets(movie)}
                                    disabled={movie.availableSeats === 0}
                                >
                                    Book Tickets
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageBooking;
