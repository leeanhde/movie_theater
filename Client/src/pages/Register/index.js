import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import * as authService from '~/services/auth.service';
import axios from 'axios';

const cx = classNames.bind(styles);

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        dob: '',
        gender: '',
        identityCard: '',
        email: '',
        address: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.confirmPassword !== formData.password) {
            alert('Confirm Password does not match Password');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Invalid email format');
            return;
        }
        try {
            const res = await authService.register({ ...formData, roles: ['member'] });
            console.log('🚀 ~ handleSubmit ~ res:', res);
        } catch (error) {
            console.log("🚀 ~ handleSubmit ~ error:", error.response.data.message)
        }


        // const data =await authService.register(formData);
        // console.log("🚀 ~ handleSubmit ~ data:", data)
        // Handle form submission here
    };

    return (
        <div className={cx('register-container')}>
            <h2>REGISTER ACCOUNT</h2>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) =>
                    key !== 'gender' ? (
                        <div key={key} className={cx('form-group')}>
                            <input
                                type={
                                    key === 'password' || key === 'confirmPassword'
                                        ? 'password'
                                        : key === 'dob'
                                        ? 'date'
                                        : 'text'
                                }
                                name={key}
                                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    ) : null,
                )}
                <div className={cx('form-group')}>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={formData.gender === 'male'}
                            onChange={handleChange}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={formData.gender === 'female'}
                            onChange={handleChange}
                        />
                        Female
                    </label>
                </div>
                <button type="submit" className={cx('button')}>
                    LOGIN
                </button>
            </form>
            <p className={cx('register-link')}>
                have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
}

export default Register;
