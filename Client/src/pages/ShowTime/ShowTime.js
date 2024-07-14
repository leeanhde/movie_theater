import classNames from 'classnames/bind';
import styles from './ShowTime.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function ShowTime() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const [showtimes, setShowtimes] = useState([]);
    const [movies, setMovies] = useState([]);
    const getList = async () => {
        const req = await axios.get('http://localhost:9999/api/schedule/list');
        console.log('listschedule');
        console.log(req.data);
        setShowtimes(req?.data)
    }
    const getMovies = async () => {
        const req = await axios.get('http://localhost:9999/api/movies/movielist');
        //check neu co data:
        if (req.data) {
            console.log('list movie');
            setMovies(req.data);
            console.log(req.data);
        } else {
            alert("....")
        }
    }
    useEffect(() => {
        getList();
        getMovies();
    }, []);


    // State to track selected day
    const [selectedDay, setSelectedDay] = useState('Monday');

    const handleTimeClick = (movieTitle, time, showDate) => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        navigate('/showtime/bookingseat', {
            state: { movieTitle, time, selectedDay, showDate, currentDate: formattedDate },
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
                                        <div className={cx('movie-info')}>
                                            <img src={movie.imageUrl} alt={movie.title} className={cx('movie-image')} />
                                            <div className={cx('movie-details')}>
                                                <h3>{movie.title}</h3>
                                                <p className={cx('genre')}>{movie.genre}</p>
                                                <p className={cx('show-date')}> {movie.showDate}</p>
                                                <div className={cx('formats')}>
                                                    {movie.formats.map((format, index) => (
                                                        <span key={index} className={cx('format')}>
                                                            {format}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
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

export default ShowTime;
