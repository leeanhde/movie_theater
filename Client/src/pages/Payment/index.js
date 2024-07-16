import React from 'react';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import axios from 'axios';

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
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            amount: parseInt(totalPrice),
        };

        try {
            const response = await axios.post('http://localhost:9999/api/vnpay/create_payment_url', data);
            console.log(response.data.vnpUrl);
            const { vnpUrl } = response.data;

            if (vnpUrl) {
                window.open(vnpUrl, '_blank');
            }
        } catch (error) {
            console.error('Error creating payment URL:', error);
        }
    };
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
                <button
                    style={{
                        fontSize: '20px',
                        padding: '10px 25px',
                        backgroundColor: '#6ec4ff',
                        border: '1px solid blue',
                        borderRadius: '20px',
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
            <div className={cx('total-price')}>
                Tạm tính <span>{totalPrice}</span>
            </div>
            <p className={cx('note')}>Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</p>
            {/* Thêm nút để gọi API bookTicket */}
            <button
                className={cx('book-ticket-btn')}
                // onClick={handleBookTicket}
                // disabled={loading}
            >
                {/* {loading ? 'Đang đặt vé...' : 'Đặt vé'} */}
            </button>
        </div>
    );
};

export default Payment;
