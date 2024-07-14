import classNames from 'classnames/bind';
import styles from './ShowTime.module.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function ShowTime() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();

    // // Dummy data for showtimes
    // const showtimes = [
    //     {
    //         day: 'Monday',
    //         movies: [
    //             {
    //                 title: 'Ngoi Ben Nui Lua',
    //                 genre: 'Action',
    //                 formats: ['2D', '3D'],
    //                 times: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    //                 imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg', // Example image URL
    //                 showDate: '2024-06-17', // Example date
    //             },
    //             {
    //                 title: 'Ngoi Ben Nui Lua',
    //                 genre: 'Comedy',
    //                 formats: ['2D'],
    //                 times: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'],
    //                 imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg', // Example image URL
    //                 showDate: '2024-06-17', // Example date
    //             },
    //         ],
    //     },
    //     {
    //         day: 'Tuesday',
    //         movies: [
    //             {
    //                 title: 'Ngoi Ben Nui Lua',
    //                 genre: 'Sci-Fi',
    //                 formats: ['3D'],
    //                 times: ['9:00 AM', '12:00 PM', '3:00 PM', '6:00 PM'],
    //                 imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg', // Example image URL
    //                 showDate: '2024-06-18', // Example date
    //             },
    //             {
    //                 title: 'Ngoi Ben Nui Lua',
    //                 genre: 'Horror',
    //                 formats: ['2D', '4D'],
    //                 times: ['10:30 AM', '1:30 PM', '4:30 PM', '7:30 PM'],
    //                 imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg', // Example image URL
    //                 showDate: '2024-06-18', // Example date
    //             },
    //         ],
    //     },
    //     // Add more days and movies as needed
    // ];
    const [showtimes, setShowtimes] = useState([]);
    const [movies, setMovies] = useState([]);
    const getList =  async () =>{
       const req= await axios.get('http://localhost:9999/api/schedule/list');
       console.log(req.data);
       setShowtimes(req?.data)
    }
    const getMovies = async () => {
        const req = await axios.get('http://localhost:9999/api/movies/movielist');
        //check neu co data:
        if(req.data){
            setMovies(req.data)
        }else{
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
