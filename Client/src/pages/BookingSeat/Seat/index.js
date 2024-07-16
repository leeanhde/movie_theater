import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './SeatGrid.module.scss';

const cx = classNames.bind(styles);

const SeatGrid = ({ selectedSeats, onSeatSelect, cinemaroomId }) => {
    const [bookedSeats, setBookedSeats] = useState([]);

    useEffect(() => {
        // Fetch booked seats based on cinemaroomId
        const fetchBookedSeats = async () => {
            try {
                const response = await fetch(`http://localhost:9999/api/cinemas/${cinemaroomId}/listallseats`);
                // const response = await fetch(`http://localhost:9999/api/cinemas/668f6d640d176253a07a186c/listallseats`);
                const data = await response.json();
                setBookedSeats(data);
            } catch (error) {
                console.error('Failed to fetch booked seats', error);
            }
        };

        if (cinemaroomId) {
            fetchBookedSeats();
        }
    }, [cinemaroomId]);
    console.log(bookedSeats)
    // Get unique seat rows and columns
    const rows = [...new Set(bookedSeats.map(seat => seat.seatRow))];
    const columns = [...new Set(bookedSeats.map(seat => seat.seatColumn))];

    const seats = rows.map(row =>
        columns.map(column => {
            const seatNumber = `${row}${column}`;
            const bookedSeat = bookedSeats.find(seat => seat.seatRow === row && seat.seatColumn === column);

            const isBooked = bookedSeat ? bookedSeat.seatStatus === 1 : false;
            const isSelected = selectedSeats.includes(seatNumber);
            const seatType = bookedSeat
                ? bookedSeat.seatType === 2
                    ? 'vip'
                    : 'normal'
                : 'normal'; // Default to normal if seatType is not defined

            return {
                seatNumber,
                seatType: isBooked ? 'booked' : isSelected ? 'selected' : seatType,
                isBooked,
                isSelected
            };
        })
    );

    const handleSeatClick = (seatNumber) => {
        const seatRow = seatNumber.charAt(0);
        const seatColumn = parseInt(seatNumber.slice(1), 10);
        if (bookedSeats.some(seat => seat.seatRow === seatRow && seat.seatColumn === seatColumn && seat.seatStatus === 1)) return;
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
                            onClick={!seat.isBooked ? () => handleSeatClick(seat.seatNumber) : null}
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
