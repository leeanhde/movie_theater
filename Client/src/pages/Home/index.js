import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import MovieShowingList from '~/pages/MovieList/MovieShowing/index';
import MovieComingSoon from '~/pages/MovieList/MovieComingSoon/index';
import Feedback from '~/pages/Feedback/index';

function Home() {
    const cx = classNames.bind(styles);
    // Dummy data for movies
    const moviesNowPlaying = [
        {
            id: 1,
            title: 'Movie 1',
            genre: 'Action',
            rating: 8.5,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 2,
            title: 'Movie 2',
            genre: 'Comedy',
            rating: 7.8,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 3,
            title: 'Movie 3',
            genre: 'Sci-Fi',
            rating: 9.0,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 4,
            title: 'Movie 4',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 5,
            title: 'Movie 5',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 6,
            title: 'Movie 6',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
        },
        {
            id: 7,
            title: 'Movie 7',
            genre: 'Drama',
            rating: 8.2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
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

    const feedbacks = [
        {
            id: 1,
            title: 'Những Kẻ Theo Đói phim của mỹ',
            rating: 9.0,
            comments: 2,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            userComments: [
                {
                    username: 'Nguyen Anh Huy',
                    comment: 'Cực phẩm!',
                    rating: 10,
                },
                {
                    username: 'Le Thi Thuy Trang',
                    comment: 'Đáng xem',
                    rating: 8,
                },
            ],
        },
        {
            id: 2,
            title: 'Linh Hồn Vũ Nữ 2: Nghị Thực Hồi Sinh',
            rating: 4.1,
            comments: 50,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            userComments: [
                {
                    username: 'Pham Anh Thu',
                    comment: 'Phim dở nha bây ơi bây để đi xem phim Gia Tài Của Ngoại con có lý...',
                    rating: null,
                },
                {
                    username: 'Chu Ba Dat',
                    comment: 'Xin Chào Mọi Người ! Bộ Phim này Sáng nay mình mới coi nè.',
                    rating: null,
                },
            ],
        },
        {
            id: 3,
            title: 'Những Gã Trai Hư: Chơi Hây Đi Xó!',
            rating: 9.4,
            comments: 399,
            imageUrl: 'https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg',
            userComments: [
                {
                    username: 'Nguyen Thanh Duc',
                    comment: 'Nội chung đây chỉ là một phim giải trí, lelel phim truyện hình, ra rạp xem thì nỡ phí.',
                    rating: null,
                },
                {
                    username: 'Nguyen Minh Hung',
                    comment: 'Good!=))',
                    rating: null,
                },
            ],
        },
    ];

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Order M+ movie tickets</h1>
                <div className={cx('content')}>
                    <ul className={cx('features')}>
                        <li>Buy tickets online, experience good movies</li>
                        <li>Book tickets safely on M+</li>
                        <li>You can freely choose your seat and buy convenient popcorn and drinks.</li>
                        <li>Ticket booking history is saved immediately</li>
                    </ul>
                    <button className={cx('bookingButton')}>Booking</button>
                </div>
            </div>
            <div className={cx('movieShowingSection')}>
                <h2 className={cx('movieShowingTitle')}>Movie is showing</h2>
                <MovieShowingList movies={moviesNowPlaying} />
            </div>

            <div className={cx('movieReviewSection')}>
                <h2 className={cx('movieReviewTitle')}>Movie review</h2>
                <Feedback movies={moviesComingSoon} />
            </div>

            <div className={cx('movies-section')}>
                <h2 className={cx('movieShowingTitle')}>Movie coming soon</h2>
                <MovieComingSoon movies={moviesComingSoon} />
            </div>
        </div>
    );
}

export default Home;
