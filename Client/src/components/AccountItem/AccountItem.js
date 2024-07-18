import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import styles from './AccountItem.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);


function AccountItem({ data }) {
    const navigate = useNavigate();
    console.log('datane', data);
        const handleMovieClick = () => {
            navigate('/moviedetail', { state: { movie: data } });
        };
    
        return (
            <div className={cx('wrapper')} onClick={handleMovieClick}>
                <img className={cx('avatar')} src={data.largeImage} alt={data.movieNameEnglish} />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        <span>{data.movieNameEnglish}</span>
                    </h4>
                    <span className={cx('username')}>{data.movieNameEnglish}</span>
                </div>
            </div>
        );
}

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
