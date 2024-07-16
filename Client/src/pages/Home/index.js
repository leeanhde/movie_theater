import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import MovieShowingList from '~/pages/MovieList/MovieShowing/index';
import MovieComingSoon from '~/pages/MovieList/MovieComingSoon/index';
import Feedback from '~/pages/Feedback/index';

function Home() {
    const cx = classNames.bind(styles);

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
                <MovieShowingList />
            </div>

            <div className={cx('movieReviewSection')}>
                <h2 className={cx('movieReviewTitle')}>Movie review</h2>
                <Feedback />
            </div>

            <div className={cx('movies-section')}>
                <h2 className={cx('movieShowingTitle')}>Movie coming soon</h2>
                <MovieComingSoon />
            </div>
        </div>
    );
}

export default Home;
