import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MovieShowing.module.scss';
import * as movieService from '~/services/movieService';

const cx = classNames.bind(styles);

const MovieShowingList = () => {
    const movieListRef = useRef(null);
    const [cardWidth, setCardWidth] = useState(0);
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMoviesNowShowing = async () => {
            try {
                setIsLoading(true);
                const movies = await movieService.getMoviesNowShowing();
                console.log('Fetched movies:', movies);
                setMovies(movies);
                setError(null);
            } catch (error) {
                console.error('Error fetching movies now showing:', error);
                setError('Failed to load movies. Please try again later.');
                setMovies([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMoviesNowShowing();
    }, []);

    useEffect(() => {
        if (movies.length > 0 && movieListRef.current && movieListRef.current.firstChild) {
            const cardWidth = movieListRef.current.firstChild.getBoundingClientRect().width;
            setCardWidth(cardWidth + 20);
        }
    }, [movies]);

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

    if (isLoading) {
        return <div className={cx('loading')}>Loading movies...</div>;
    }

    if (error) {
        return <div className={cx('error')}>{error}</div>;
    }

    return (
        <div className={cx('movieShowingSection')}>
            <h2 className={cx('movieShowingTitle')}>Showing</h2>
            {movies.length > 0 ? (
                <>
                    <button className={cx('arrowButton', 'left')} onClick={scrollLeft}>
                        &#10094;
                    </button>
                    <div className={cx('movieList')} ref={movieListRef}>
                        {movies.map((movie) => (
                            <div key={movie.id} className={cx('movieCard')} onClick={() => handleMovieClick(movie)}>
                                <img src={movie.largeImage} alt={movie.smallImage} className={cx('movieImage')} />
                                <h3 className={cx('movieTitle')}>{movie.movieNameEnglish}</h3>
                                <p className={cx('movieShowTimes')}>{movie.director}</p>
                                <div className={cx('movieRating')}>
                                    <svg className={cx('starIcon')} viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                    5
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className={cx('arrowButton', 'right')} onClick={scrollRight}>
                        &#10095;
                    </button>
                </>
            ) : (
                <p className={cx('noMovies')}>No movies available at the moment.</p>
            )}
        </div>
    );
};

export default MovieShowingList;
