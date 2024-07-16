import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../utils/AuthContext';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9999/api/auth/signin', { email, password });
            const { id, email: userEmail, roles, accessToken } = response.data;
            console.log(response.data);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify({ id, email, roles }));
            setAuth({ id, email: userEmail, roles, accessToken });
            // Điều hướng dựa trên vai trò
            if (roles.includes('admin')) {
                navigate('/managemovie');
            } else if (roles.includes('supervisor')) {
                navigate('/ticketcodemanagement');
            } else if (roles.includes('staff')) {
                navigate('/schedulesstaff');
            } else if (roles.includes('member')) {
                navigate('/home');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('Đăng nhập thất bại:', error);
            alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
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
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
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
