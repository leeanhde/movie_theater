import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BookingSeat.module.scss';
import SeatGrid from './Seat/index';

const cx = classNames.bind(styles);

function BookingSeat() {
    const location = useLocation();
    const navigate = useNavigate();
    const { movieTitle, time, selectedDay, showDate, currentDate: formattedDate } = location.state || {};
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleContinue = () => {
        const totalPrice = calculateTotalPrice(selectedSeats);
        // Ở đây, bạn có thể xử lý logic để chuyển đến trang thanh toán
        // với thông tin về các ghế đã chọn và thông tin phim
        navigate('/showtime/bookingseat/payment', {
            state: {
                selectedSeats,
                movieTitle,
                time,
                selectedDay,
                showDate,
                currentDate: formattedDate,
                totalPrice,
            },
        });
    };

    const handleUnselectSeat = (seat) => {
        setSelectedSeats((prevSeats) => prevSeats.filter((s) => s !== seat));
    };

    const calculateTotalPrice = (seats) => {
        const vipSeatsCount = seats.filter((seat) => isVipSeat(seat)).length;
        const normalSeatsCount = seats.length - vipSeatsCount;

        return vipSeatsCount * 120000 + normalSeatsCount * 90000;
    };

    const isVipSeat = (seat) => {
        const row = seat.charCodeAt(0) - 65;
        return row < 6; // Giả sử 6 hàng đầu là ghế VIP
    };

    return (
        <div className={cx('booking-seat')}>
            <h1>Booking Seat</h1>
            {movieTitle && time ? (
                <div className={cx('content')}>
                    <div className={cx('movie-info')}>
                        <p>
                            Movie: {movieTitle} · {time} · {selectedDay} · {showDate}
                        </p>
                    </div>
                    <div className={cx('selected-seats')}>
                        <div className={cx('label')}>Chỗ ngồi</div>
                        <div className={cx('seat-list')}>
                            {selectedSeats.map((seat) => (
                                <div key={seat} className={cx('seat')}>
                                    {seat}{' '}
                                    <span className={cx('close')} onClick={() => handleUnselectSeat(seat)}>
                                        ×
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={cx('total-price')}>
                        <div className={cx('label')}>Tạm tính</div>
                        <div className={cx('price')}>{calculateTotalPrice(selectedSeats)}đ</div>
                    </div>
                    <SeatGrid
                        selectedSeats={selectedSeats}
                        onSeatSelect={(seat) =>
                            setSelectedSeats((prevSeats) =>
                                prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat],
                            )
                        }
                    />
                    <button
                        className={cx('continue-btn')}
                        onClick={handleContinue}
                        disabled={selectedSeats.length === 0}
                    >
                        Continue
                    </button>
                </div>
            ) : (
                <p>No movie selected</p>
            )}
        </div>
    );
}

export default BookingSeat;
