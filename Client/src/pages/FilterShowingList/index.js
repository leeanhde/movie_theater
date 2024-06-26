import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './FilterShowingList.module.scss';
import FilterBar from './FilterBar/index';
import { useNavigate } from 'react-router-dom';

const FilterShowingList = ({ movies }) => {
    const cx = classNames.bind(styles);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 5;
    const [filteredMovies, setFilteredMovies] = useState(movies);
    const [genre, setGenre] = useState('');
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        filterMovies();
    }, [genre, country, year, search, movies]);

    const filterMovies = () => {
        let result = movies;

        if (genre) {
            result = result.filter((movie) => movie.genre.toLowerCase().includes(genre.toLowerCase()));
        }
        if (country) {
            result = result.filter((movie) => movie.country.toLowerCase().includes(country.toLowerCase()));
        }
        if (year) {
            result = result.filter((movie) => movie.year.toString() === year);
        }
        if (search) {
            result = result.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()));
        }

        setFilteredMovies(result);
        setCurrentPage(1); // Reset to first page on new filter
    };

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleMovieClick = (movie) => {
        navigate('/moviedetail', { state: { movie } });
    };

    return (
        <div className={cx('movieShowingSection')}>
            <h2 className={cx('movieShowingTitle')}>Phim đang chiếu</h2>
            <FilterBar
                genre={genre}
                setGenre={setGenre}
                country={country}
                setCountry={setCountry}
                year={year}
                setYear={setYear}
                search={search}
                setSearch={setSearch}
            />
            <div className={cx('movieList')}>
                {currentMovies.map((movie) => (
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
            <div className={cx('pagination')}>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={cx('pageButton', { active: currentPage === i + 1 })}
                        onClick={() => paginate(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FilterShowingList;
