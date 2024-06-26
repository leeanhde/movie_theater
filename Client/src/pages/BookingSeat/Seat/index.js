import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SeatGrid.module.scss';

const cx = classNames.bind(styles);

const SeatGrid = ({ selectedSeats, onSeatSelect }) => {
    const [bookedSeats] = useState(['A1', 'B5', 'D10', 'E12']);

    const seats = Array(13)
        .fill(null)
        .map((_, rowIndex) =>
            Array(13)
                .fill(null)
                .map((_, colIndex) => {
                    const seatNumber = `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`;
                    const isBooked = bookedSeats.includes(seatNumber);
                    const isSelected = selectedSeats.includes(seatNumber);
                    const seatType = isBooked ? 'booked' : isSelected ? 'selected' : rowIndex < 6 ? 'vip' : 'normal';

                    return { seatNumber, seatType, isBooked, isSelected };
                }),
        );

    const handleSeatClick = (seatNumber) => {
        if (bookedSeats.includes(seatNumber)) return;
        onSeatSelect(seatNumber);
    };

    return (
        <div className={cx('seat-grid')}>
            <div className={cx('screen')}>Màn hình</div>
            <div className={cx('legend')}>
                <div className={cx('legend-item', 'normal')}>Ghế thường</div>
                <div className={cx('legend-item', 'vip')}>Ghế VIP</div>
                <div className={cx('legend-item', 'selected')}>Ghế đã chọn</div>
                <div className={cx('legend-item', 'booked')}>Ghế đã đặt</div>
            </div>
            {seats.map((row, rowIndex) => (
                <div key={rowIndex} className={cx('row')}>
                    {row.map((seat, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={cx('seat', seat.seatType)}
                            onClick={() => handleSeatClick(seat.seatNumber)}
                            disabled={seat.isBooked}
                        >
                            {seat.seatNumber}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SeatGrid;
