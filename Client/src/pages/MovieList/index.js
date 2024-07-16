import classNames from 'classnames/bind';
import styles from './MovieList.module.scss';
import MovieShowingList from './MovieShowing/index';
import MovieComingSoon from './MovieComingSoon/index';
import FilterShowingList from '~/pages/FilterShowingList/index';

function MovieList() {
    const cx = classNames.bind(styles);

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
