import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedFilm.module.scss';
import FilmItem from './FilmItem';

const cx = classNames.bind(styles);

function SuggestedFilm({ label }) {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            <FilmItem />
            <FilmItem />
            <FilmItem />
            <FilmItem />
            <FilmItem />
            <FilmItem />

            <p className={cx('more-btn')}>See all</p>
        </div>
    );
}

SuggestedFilm.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedFilm;
