import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useNavigate, Link } from 'react-router-dom';
import * as userService from '~/services/user.service';

const cx = classNames.bind(styles);

const UserProfileWrapper = ({ user }) => {
    const [userInfo, setUserInfo] = useState(user);
    const navigate = useNavigate();

    useEffect(() => {
        setUserInfo(user.user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.updateProfile(userInfo.id, userInfo);
            console.log(userInfo.id, userInfo);
            alert('Profile updated successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Error updating user profile:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className={cx('profileContainer')}>
            <div className={cx('profileHeader')}>
                <img src={userInfo.image} alt={userInfo.username} className={cx('profileImage')} />
            </div>
            <form className={cx('profileForm')} onSubmit={handleSubmit}>
                <label className={cx('profileLabel')}>
                    Account:
                    <input
                        type="text"
                        name="username"
                        value={userInfo.username}
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
                        name="fullName"
                        value={userInfo.fullName || ''}
                        onChange={handleChange}
                        className={cx('profileInput')}
                    />
                </label>
                <label className={cx('profileLabel')}>
                    Date of birth:
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={userInfo.dob || ''}
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
                        <Link to="/home">Back</Link>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserProfileWrapper;
