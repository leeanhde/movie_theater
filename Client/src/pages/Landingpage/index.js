import React from 'react';
import classNames from 'classnames/bind';
import styles from './Landingpage.module.scss';

const cx = classNames.bind(styles);

function Landingpage() {
    return (
        <div className={cx('landing-page')}>
            <div className={cx('overlay')}>
                <h1>Welcome to Movie Theater</h1>
                <p>
                    Experience the best movies in our theater with top-notch facilities and comfortable seating. Enjoy a
                    wide range of snacks and beverages.
                </p>
                <button className={cx('btn')}>Learn More</button>
            </div>
        </div>
    );
}

export default Landingpage;
