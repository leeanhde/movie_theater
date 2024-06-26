import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const UserProfileWrapper = ({ user }) => {
    const [userInfo, setUserInfo] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    return (
        <div className={cx('profileContainer')}>
            <div className={cx('profileHeader')}>
                <img src={userInfo.profileImage} alt={userInfo.name} className={cx('profileImage')} />
            </div>
            <form className={cx('profileForm')}>
                <label className={cx('profileLabel')}>
                    Account:
                    <input
                        type="text"
                        name="name"
                        value={userInfo.name}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userInfo.password || ''}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Fullname:
                    <input
                        type="text"
                        name="fullname"
                        value={userInfo.fullname || ''}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Date of birth:
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={userInfo.dateOfBirth || ''}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Identity card:
                    <input
                        type="text"
                        name="identityCard"
                        value={userInfo.identityCard || ''}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <div className={cx('profileLabel')}>
                    Gender:
                    <label className={cx('profileRadioLabel')}>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={userInfo.gender === 'male'}
                            onChange={handleChange}
                            className={cx('profileRadio')}
                        />
                        Male
                    </label>
                    <label className={cx('profileRadioLabel')}>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={userInfo.gender === 'female'}
                            onChange={handleChange}
                            className={cx('profileRadio')}
                        />
                        Female
                    </label>
                </div>
                <label className={cx('profileLabel')}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Address:
                    <input
                        type="text"
                        name="address"
                        value={userInfo.address || ''}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Phone number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={userInfo.phoneNumber || ''}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Image:
                    <input type="file" name="image" className={cx('profileInput')} />
                </label>
                <div className={cx('profileButtons')}>
                    <button type="submit" className={cx('profileButton', 'saveButton')}>
                        Save
                    </button>
                    <button type="button" className={cx('profileButton', 'backButton')}>
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfileWrapper;
