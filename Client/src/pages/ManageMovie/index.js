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
    const [showPopup, setShowPopup] = useState(false);
    const [movies, setMovies] = useState(initialMovies);
    const [filteredMovies, setFilteredMovies] = useState(initialMovies);
    const [searchTerm, setSearchTerm] = useState('');
    const [newMovie, setNewMovie] = useState({ name: '', genre: '', duration: '', status: 'Coming Soon' });

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const newId = movies.length ? movies[movies.length - 1].id + 1 : 1;
        const updatedMovies = [...movies, { ...newMovie, id: newId }];
        setMovies(updatedMovies);
        setFilteredMovies(updatedMovies);
        togglePopup();
    };

    return (
        <div>

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
            </div>
            <div className={cx('add-movie-button-container')}>
                <button className={cx('button', 'add-movie-button')} onClick={togglePopup}>
                    Add Movie
                </button>
            </div>
            {showPopup && (
                <div className={cx('popup')}>
                    <div className={cx('popup-inner')}>
                        <h2>Add New Movie</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label>Title:</label>
                                <input type="text" name="name" value={newMovie.name} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Genre:</label>
                                <input type="text" name="genre" value={newMovie.genre} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Duration:</label>
                                <input type="text" name="duration" value={newMovie.duration} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Status:</label>
                                <select name="status" value={newMovie.status} onChange={handleInputChange} required>
                                    <option value="Coming Soon">Coming Soon</option>
                                    <option value="Now Showing">Now Showing</option>
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                            <button type="button" onClick={togglePopup}>Close</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageMovie;
