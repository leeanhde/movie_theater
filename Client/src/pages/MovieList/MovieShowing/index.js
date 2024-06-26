import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MovieShowing.module.scss';

const MovieShowingList = ({ movies }) => {
    const cx = classNames.bind(styles);
    const movieListRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (movieListRef.current && movieListRef.current.firstChild) {
            const cardWidth = movieListRef.current.firstChild.getBoundingClientRect().width;
            setCardWidth(cardWidth + 20); // Card width + margin
        }
    }, []);

    const scrollLeft = () => {
        if (movieListRef.current) {
            movieListRef.current.scrollBy({ left: -cardWidth * 4, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (movieListRef.current) {
            movieListRef.current.scrollBy({ left: cardWidth * 4, behavior: 'smooth' });
        }
    };

    const handleMovieClick = (movie) => {
        navigate('/moviedetail', { state: { movie } });
    };

    return (
        <div className={cx('movieShowingSection')}>
            <h2 className={cx('movieShowingTitle')}>Showing</h2>
            <button className={cx('arrowButton', 'left')} onClick={scrollLeft}>
                &#10094;
            </button>
            <div className={cx('movieList')} ref={movieListRef}>
                {movies.map((movie) => (
                    <div key={movie.id} className={cx('movieCard')} onClick={() => handleMovieClick(movie)}>
                        <img src={movie.imageUrl} alt={movie.title} className={cx('movieImage')} />
                        <h3 className={cx('movieTitle')}>{movie.title}</h3>
                        <p className={cx('movieShowTimes')}>{movie.genre}</p>
                        <div className={cx('movieRating')}>
                            <svg className={cx('starIcon')} viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                            {movie.rating}
                        </div>
                    </div>
                ))}
            </div>
            <button className={cx('arrowButton', 'right')} onClick={scrollRight}>
                &#10095;
            </button>
        </div>
    );
};

export default MovieShowingList;
