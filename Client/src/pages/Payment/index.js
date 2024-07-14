import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

const Payment = () => {
    const location = useLocation();
    const {
        selectedSeats,
        selectedFoods,
        movieTitle,
        time,
        selectedDay,
        showDate,
        currentDate: formattedDate,
        totalPrice,
    } = location.state || {};
    const foodListString = selectedFoods.map(food =>
        `${food.foodTitle} x ${food.quantity}`
    ).join(', ');
    const [vnpUrl, setVnpUrl] = useState('');

    useEffect(() => {
        const createPaymentUrl = async () => {
            try {
                const response = await axios.post('http://localhost:9999/create_payment_url', {
                    amount: totalPrice,
                    orderInfo: `selectedSeats: ${selectedSeats}, Time: ${time}, Date: ${showDate}`,
                });
                setVnpUrl(response.data.vnpUrl); // Update vnpUrl state
            } catch (error) {
                console.error('Error creating payment URL:', error);
            }
        };
        createPaymentUrl();
    }, [movieTitle, time, showDate, totalPrice]);

    return (
        <div className={cx('payment-page')}>
            <div className={cx('movie-details')}>
                <h2 className={cx('title')}>{movieTitle}</h2>
                <div className={cx('info')}>
                    <p>
                        Thời gian: <span>{time}</span>
                    </p>
                    <p>
                        Ngày chiếu: <span>{showDate}</span>
                    </p>
                    <p>
                        Rạp: <span>Beta Quang Trung</span>
                    </p>
                    <p>Số 645 Quang Trung, Phường 11, Quận Gò Vấp, Thành phố Hồ Chí Minh</p>
                    <p>
                        Phòng chiếu: <span>P5</span>
                    </p>
                    <p>
                        Ghế: <span>{selectedSeats.join(', ')}</span>
                    </p>
                    <p>
                        Đồ ăn: <span>{foodListString}</span>
                    </p>
                    <p>
                        Định dạng: <span>2D Lồng tiếng</span>
                    </p>
                </div>
            </div>
            <div className={cx('qr-code')}>
                <h3>Quét mã QR bằng MoMo để thanh toán</h3>
                {vnpUrl ? (
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(vnpUrl)}&size=200x200`} alt="QR Code" className={cx('qr-image')} />
                ) : (
                    <p>Đang tạo QR Code...</p>
                )}
                <p>Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.</p>
            </div>
            <div className={cx('total-price')}>
                Tạm tính <span>{totalPrice.toLocaleString()} đ</span>
            </div>
            <p className={cx('note')}>Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</p>
        </div>
    );
};

export default Payment;
