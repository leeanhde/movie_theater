import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BookingSeat.module.scss';
import SeatGrid from './Seat/index';

const cx = classNames.bind(styles);

function BookingSeat() {
    const location = useLocation();
    const navigate = useNavigate();

    /// no lay tu cai state dc truyen voa
    const {movie, movieTitle, time, selectedDay, showDate, currentDate: formattedDate, cinemaroomId } = location.state || {};
    console.log("🚀 ~ BookingSeat ~ movieTitle:", movie)
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedSeatsDetail, setSelectedSeatsDetail] = useState([]);

    const handleContinue = () => {
        const totalPrice = calculateTotalPrice(selectedSeats);
        navigate('/showtime/bookingfood', {
            state: {
                selectedSeats,
                movieTitle,
                time,
                selectedDay,
                showDate,
                currentDate: formattedDate,
                totalPrice,
                movie
            },
        });
    };

    const handleUnselectSeat = (seat) => {
        setSelectedSeats((prevSeats) => prevSeats.filter((s) => s !== seat));
        setSelectedSeatsDetail((prevSeats) => prevSeats.filter((s) => s !== seat));
    };

    const calculateTotalPrice = (seats) => {
        const vipSeatsCount = seats.filter((seat) => isVipSeat(seat)).length;
        const normalSeatsCount = seats.length - vipSeatsCount;
        const totalPrice = vipSeatsCount * 120000 + normalSeatsCount * 90000;

        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
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
                            setSelectedSeats((prevSeats) => {
                                return prevSeats.includes(seat) ? prevSeats.filter((s) => s !== seat) : [...prevSeats, seat]
                            })
                        }
                        onSeatSelectDetail={(seat, details) =>
                            setSelectedSeatsDetail((prevSeats) =>
                                prevSeats.find((s) => s.seatNumber === seat) ? prevSeats.filter((s) => s.seatNumber !== seat) : [...prevSeats, details]
                            )
                        }

                        cinemaroomId={cinemaroomId}
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
