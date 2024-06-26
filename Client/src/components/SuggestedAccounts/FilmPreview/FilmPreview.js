import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './FilmPreview.module.scss';

const cx = classNames.bind(styles);

function FilmPreview() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    className={cx('avatar')}
                    src="https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg"
                    alt=""
                />
                <Button className={cx('book-btn')} primary>
                    Booking
                </Button>
            </div>
            <div className={cx('body')}>
                <p className={cx('nickname')}>
                    <strong>Inside Out 2</strong>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>Những Mảnh Ghép Cảm Xúc 2</p>
                <p className={cx('analytics')}>
                    <strong className={cx('value')}>Ngày chiếu </strong>
                    <span className={cx('label')}>14/06/2024</span>
                    <strong className={cx('value')}>Thể loại </strong>
                    <span className={cx('label')}>Hài, Hoạt hình</span>
                </p>
            </div>
        </div>
    );
}

export default FilmPreview;
