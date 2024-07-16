import classNames from 'classnames/bind';
import styles from './MovieList.module.scss';
import MovieShowingList from './MovieShowing/index';
import MovieComingSoon from './MovieComingSoon/index';
import FilterShowingList from '~/pages/FilterShowingList/index';

function MovieList() {
    const cx = classNames.bind(styles);

    // Dummy data for movies
    const moviesNowPlaying = [
        {
            id: 1,
            title: 'Movie 1',
            genre: 'Action',
            rating: 8.5,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            cinemaroomId: '668f87d09f7e2cac95e83e51',
        },
        {
            id: 2,
            title: 'Movie 2',
            genre: 'Comedy',
            rating: 7.8,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            cinemaroomId: '668f87d09f7e2cac95e83e51',
        },
        {
            id: 3,
            title: 'Movie 3',
            genre: 'Sci-Fi',
            rating: 9.0,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            cinemaroomId: '668f87d09f7e2cac95e83e51',
        },
        {
            id: 4,
            title: 'Movie 4',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            cinemaroomId: '668f87d09f7e2cac95e83e51',
        },
        {
            id: 5,
            title: 'Movie 5',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            cinemaroomId: '668f87d09f7e2cac95e83e51',
        },
        {
            id: 6,
            title: 'Movie 6',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            cinemaroomId: '668f87d09f7e2cac95e83e51',
        },
        {
            id: 7,
            title: 'Movie 7',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            cinemaroomId: '668f87d09f7e2cac95e83e51',
        },
        // Add more movies as needed
    ];

    const moviesComingSoon = [
        {
            id: 5,
            title: 'Movie 5',
            genre: 'Thriller',
            rating: 7.5,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 6,
            title: 'Movie 6',
            genre: 'Animation',
            rating: 8.7,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 7,
            title: 'Movie 7',
            genre: 'Adventure',
            rating: 8.9,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 8,
            title: 'Movie 8',
            genre: 'Fantasy',
            rating: 7.9,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 8,
            title: 'Movie 8',
            genre: 'Fantasy',
            rating: 7.9,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 9,
            title: 'Movie 8',
            genre: 'Fantasy',
            rating: 7.9,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 10,
            title: 'Movie 8',
            genre: 'Fantasy',
            rating: 7.9,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        // Add more movies as needed
    ];

    return (
        <div className={cx('movie-list')}>
            <h1>Movie List</h1>

            <div className={cx('movies-section')}>
                <MovieShowingList />
            </div>

            <div className={cx('movies-section')}>
                <MovieComingSoon />
            </div>

            <div className={cx('movies-section')}>
                <FilterShowingList />
            </div>
        </div>
    );
}

export default MovieList;
