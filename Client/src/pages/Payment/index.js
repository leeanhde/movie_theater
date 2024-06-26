import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';

const cx = classNames.bind(styles);

const Payment = () => {
    const location = useLocation();
    const {
        selectedSeats,
        movieTitle,
        time,
        selectedDay,
        showDate,
        currentDate: formattedDate,
        totalPrice,
    } = location.state || {};

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
                        Định dạng: <span>2D Lồng tiếng</span>
                    </p>
                    <p>
                        Ghế: <span>{selectedSeats}</span>
                    </p>
                </div>
            </div>
            <div className={cx('qr-code')}>
                <h3>Quét mã QR bằng MoMo để thanh toán</h3>
                <div className={cx('qr-image')}>{/* Ảnh QR code */}</div>
                <p>Sử dụng App MoMo hoặc ứng dụng Camera hỗ trợ QR code để quét mã.</p>
            </div>
            <div className={cx('total-price')}>
                Tạm tính <span>{totalPrice}</span>
            </div>
            <p className={cx('note')}>Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</p>
        </div>
    );
};

export default Payment;
