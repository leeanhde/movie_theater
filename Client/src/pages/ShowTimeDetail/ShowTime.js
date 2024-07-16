import classNames from 'classnames/bind';
import styles from './ShowTimeDetail.module.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowTimeDetail() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const cinemaroomId = '668f87d09f7e2cac95e83e51';
    // Dummy data for showtimes
    const showtimes = [
        {
            day: 'Monday',
            movies: [
                {
                    title: 'Ngoi Ben Nui Lua',
                    genre: 'Action',
                    formats: ['2D', '3D'],
                    times: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
                    imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg', // Example image URL
                    showDate: '2024-06-17', // Example date
                },
            ],
        },
        {
            day: 'Tuesday',
            movies: [
                {
                    title: 'Ngoi Ben Nui Lua',
                    genre: 'Sci-Fi',
                    formats: ['3D'],
                    times: ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'],
                    imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg', // Example image URL
                    showDate: '2024-06-18', // Example date
                },
            ],
        },
        // Add more days and movies as needed
    ];

    // State to track selected day
    const [selectedDay, setSelectedDay] = useState('Monday');

    const handleTimeClick = (movieTitle, time, showDate) => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        navigate('/showtime/bookingseat', {
            state: { movieTitle, time, selectedDay, showDate, currentDate: formattedDate, cinemaroomId },
        });
    };

    return (
        <div className={cx('showtimes')}>
            <h1>Show Time</h1>
            <div className={cx('day-selector')}>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <button
                        key={day}
                        className={cx('day-button', { selected: selectedDay === day })}
                        onClick={() => setSelectedDay(day)}
                    >
                        {day}
                    </button>
                ))}
            </div>
            <div className={cx('showtime-list')}>
                {showtimes.map(
                    (daySchedule) =>
                        daySchedule.day === selectedDay && (
                            <div key={daySchedule.day} className={cx('day-schedule')}>
                                <h2>{daySchedule.day}</h2>
                                {daySchedule.movies.map((movie, index) => (
                                    <div key={index} className={cx('movie')}>
                                        <div className={cx('times')}>
                                            {movie.times.map((time, index) => (
                                                <span
                                                    key={index}
                                                    className={cx('time')}
                                                    onClick={() => handleTimeClick(movie.title, time, movie.showDate)}
                                                >
                                                    {time}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ),
                )}
            </div>
        </div>
    );
}

export default ShowTimeDetail;
