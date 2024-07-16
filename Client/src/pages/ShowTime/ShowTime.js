import classNames from 'classnames/bind';
import styles from './ShowTime.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getDayOfWeek } from '~/utils/date.helper';

function ShowTime() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    const [showtimes, setShowtimes] = useState([]);
    const [movies, setMovies] = useState([]);
    const getList = async () => {
        const req = await axios.get('http://localhost:9999/api/schedule/list');
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const dataWithDays = req.data.flatMap((e) => {
            return e.scheduleTime.map((schedule) => {
                const date = new Date(schedule);
                const day = daysOfWeek[date.getDay()];
                return { ...e, day, scheduleTime: schedule };
            });
        });
        const groupedByDay = daysOfWeek.map((day) => {
            const movies = dataWithDays.filter((e) => e.day === day);
            return { day, movies: movies };
        });
        console.log('🚀 ~ groupedByDay ~ groupedByDay:', groupedByDay);
        setShowtimes(groupedByDay);
    };
    const getMovies = async () => {
        const req = await axios.get('http://localhost:9999/api/movies/movielist');
        //check neu co data:
        if (req.data) {
            console.log('list movie');
            setMovies(req.data);
            console.log(req.data);
        } else {
            alert('....');
        }
    };
    useEffect(() => {
        getList();
        getMovies();
    }, []);

    // State to track selected day
    const [selectedDay, setSelectedDay] = useState('Monday');

    const handleTimeClick = (movie,selectDay) => {
        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        navigate('/showtime/bookingseat', {
            state: { movieTitle : movie.movieNameEnglish, time : movie.toDate, selectedDay:selectDay, showDate : selectDay, currentDate: formattedDate , cinemaroomId : "60d21b5967d0d8992e610c9b" },
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
                                {daySchedule?.moviesday?.length !== 0 &&
                                    daySchedule.movies.map((movie, index) => (
                                        <div key={index} className={cx('movie')}>
                                            <div className={cx('movie-info')}>
                                                <img src={movie?.movieId.largeImage} className={cx('movie-image')} />
                                                <div className={cx('movie-details')}>
                                                    <h3>{movie?.movieId.movieNameEnglish}</h3>
                                                    <p className={cx('genre')}>{movie.genre}</p>
                                                    {/* <p className={cx('show-date')}> {movie?.movieId.showDate}</p> */}
                                                    <div className={cx('formats')}>
                                                        {/* {movie.formats.map((format, index) => (
                                                        <span key={index} className={cx('format')}>
                                                            {format}
                                                        </span>
                                                    ))} */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('times')}>
                                                <span
                                                    className={cx('time')}
                                                    onClick={() => handleTimeClick(movie?.movieId,daySchedule.day)}
                                                >
                                                    {movie?.movieId.duration}
                                                </span>
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
