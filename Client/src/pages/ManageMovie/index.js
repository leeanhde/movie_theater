import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageMovie.module.scss';

const cx = classNames.bind(styles);

const initialMovies = [
    { id: 1, name: 'Movie A', genre: 'Action', duration: '120 mins', status: 'Coming Soon' },
    { id: 2, name: 'Movie B', genre: 'Comedy', duration: '90 mins', status: 'Now Showing' },
    // Add more initial movie data here
];

function ManageMovie() {
    const [movies, setMovies] = useState(initialMovies);
    const [filteredMovies, setFilteredMovies] = useState(initialMovies);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = movies.filter(
            (movie) =>
                movie.name.toLowerCase().includes(term) ||
                movie.genre.toLowerCase().includes(term) ||
                movie.status.toLowerCase().includes(term),
        );
        setFilteredMovies(filtered);
    };

    const handleDelete = (id) => {
        const updatedMovies = movies.filter((movie) => movie.id !== id);
        setMovies(updatedMovies);
        setFilteredMovies(updatedMovies);
    };

    return (
        <div className={cx('manage-movie')}>
            <h2 className={cx('header')}>Manage Movies</h2>
            <div className={cx('search-bar')}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={cx('search-input')}
                />
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Movie Name</th>
                        <th className={cx('th')}>Genre</th>
                        <th className={cx('th')}>Duration</th>
                        <th className={cx('th')}>Status</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMovies.map((movie) => (
                        <tr key={movie.id}>
                            <td className={cx('td')}>{movie.name}</td>
                            <td className={cx('td')}>{movie.genre}</td>
                            <td className={cx('td')}>{movie.duration}</td>
                            <td className={cx('td')}>
                                <span
                                    className={cx('status', {
                                        'status-coming-soon': movie.status === 'Coming Soon',
                                        'status-now-showing': movie.status === 'Now Showing',
                                    })}
                                >
                                    {movie.status}
                                </span>
                            </td>
                            <td className={cx('td')}>
                                <button
                                    className={cx('button', 'edit-button')}
                                    onClick={() => console.log(`Edit movie ${movie.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={cx('button', 'delete-button')}
                                    onClick={() => handleDelete(movie.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={cx('add-movie-button-container')}>
                <button className={cx('button', 'add-movie-button')} onClick={() => console.log('Add new movie')}>
                    Add Movie
                </button>
            </div>
        </div>
    );
}

export default ManageMovie;
