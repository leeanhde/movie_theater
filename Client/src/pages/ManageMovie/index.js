import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './ManageMovie.module.scss';

const cx = classNames.bind(styles);

function ManageMovie() {
    const [showPopup, setShowPopup] = useState(false);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [promotions, setPromotions] = useState([]);
    const [types, setTypes] = useState([]);
    const [newMovie, setNewMovie] = useState({
        movieNameEnglish: '',
        movieNameVn: '',
        director: '',
        actor: '',
        duration: '',
        fromDate: '',
        toDate: '',
        content: '',
        largeImage: '',
        smallImage: '',
        movieProductionCompany: '',
        promotionId: [],
        types: []
    });

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:9999/api/movies/movielist');
            const fetchedMovies = response.data.map((movie) => ({
                id: movie._id,
                name: movie.movieNameEnglish,
                genre: movie.types.join(', '),
                duration: `${movie.duration} mins`,
                status: new Date(movie.fromDate) > new Date() ? 'Coming Soon' : 'Now Showing',
            }));
            setMovies(fetchedMovies);
            setFilteredMovies(fetchedMovies);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchPromotionsAndTypes = async () => {
            try {
                const [promotionsResponse, typesResponse] = await Promise.all([
                    axios.get('http://localhost:9999/api/promotions/listPromotion'),
                    axios.get('http://localhost:9999/api/types/listtype')
                ]);
                setPromotions(promotionsResponse.data);
                setTypes(typesResponse.data);
            } catch (error) {
                console.error('Error fetching promotions and types:', error);
            }
        };
        fetchPromotionsAndTypes();
    }, []);

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

    const handleSelectChange = (event) => {
        const { name, options } = event.target;
        const selectedValues = Array.from(options).filter(option => option.selected).map(option => option.value);
        setNewMovie({ ...newMovie, [name]: selectedValues });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newMovieData = {
            ...newMovie,
            duration: parseInt(newMovie.duration),
            promotionId: newMovie.promotionId,
            types: newMovie.types
        };

        try {
            await axios.post('http://localhost:9999/api/movies/create', newMovieData);
            togglePopup();
            fetchMovies();
        } catch (error) {
            console.error('Error creating movie:', error);
        }
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
                                <label>Movie Name (English):</label>
                                <input type="text" name="movieNameEnglish" value={newMovie.movieNameEnglish} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Movie Name (Vietnamese):</label>
                                <input type="text" name="movieNameVn" value={newMovie.movieNameVn} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Director:</label>
                                <input type="text" name="director" value={newMovie.director} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Actor:</label>
                                <input type="text" name="actor" value={newMovie.actor} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Duration (minutes):</label>
                                <input type="number" name="duration" value={newMovie.duration} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>From Date:</label>
                                <input type="date" name="fromDate" value={newMovie.fromDate} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>To Date:</label>
                                <input type="date" name="toDate" value={newMovie.toDate} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Content:</label>
                                <textarea name="content" value={newMovie.content} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Large Image URL:</label>
                                <input type="url" name="largeImage" value={newMovie.largeImage} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Small Image URL:</label>
                                <input type="url" name="smallImage" value={newMovie.smallImage} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Movie Production Company:</label>
                                <input type="text" name="movieProductionCompany" value={newMovie.movieProductionCompany} onChange={handleInputChange} required />
                            </div>
                            <div>
                                <label>Promotion:</label>
                                <select name="promotionId" multiple value={newMovie.promotionId} onChange={handleSelectChange} required>
                                    {promotions.map(promotion => (
                                        <option key={promotion._id} value={promotion._id}>{promotion.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Types:</label>
                                <select name="types" multiple value={newMovie.types} onChange={handleSelectChange} required>
                                    {types.map(type => (
                                        <option key={type._id} value={type._id}>{type.typeName}</option>
                                    ))}
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
