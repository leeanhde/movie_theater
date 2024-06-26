import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (role) => {
        const redirectPath = getRedirectPath(role);
        navigate(redirectPath);
    };

    const getRedirectPath = (role) => {
        switch (role) {
            case 'user':
                return '/';
            case 'staff':
                return '/staff';
            case 'admin':
                return '/admin';
            case 'supervisor':
                return '/supervisor';
            default:
                return '/login';
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'user@gmail.com' && password === '123') {
            handleLogin('user');
        } else if (email === 'staff' && password === '123') {
            handleLogin('staff');
        } else if (email === 'admin' && password === '123') {
            handleLogin('admin');
        } else if (email === 'supervisor' && password === '123') {
            handleLogin('supervisor');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className={cx('login-container')}>
            <h2 className={cx('title')}>Welcome</h2>
            <div className={cx('icon')}>A</div>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className={cx('input')}
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className={cx('input')}
                    />
                </div>
                <button type="submit" className={cx('button')}>
                    LOGIN
                </button>
            </form>
            <p className={cx('register-link')}>
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    );
}

export default Login;
