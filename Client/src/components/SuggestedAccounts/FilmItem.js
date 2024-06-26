import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import FilmPreview from './FilmPreview/FilmPreview';
import styles from './SuggestedFilm.module.scss';

const cx = classNames.bind(styles);

function FilmItem() {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <FilmPreview />
                </PopperWrapper>
            </div>
        );
    };

    return (
        <div>
            <Tippy interactive delay={[800, 0]} offset={[-20, 0]} placement="bottom" render={renderPreview}>
                <div className={cx('film-item')}>
                    <img
                        className={cx('avatar')}
                        src="https://cinema.momocdn.net/img/44707194621265870-rsz_poster_.jpg"
                        alt=""
                    />
                    <div className={cx('item-info')}>
                        <p className={cx('nickname')}>
                            <strong>Inside Out 2</strong>
                            <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                        </p>
                        <p className={cx('name')}>Những Mảnh Ghép Cảm Xúc 2</p>
                    </div>
                </div>
            </Tippy>
        </div>
    );
}

FilmItem.propTypes = {};

export default FilmItem;
