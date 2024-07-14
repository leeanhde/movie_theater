import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './BookingFood.module.scss';
import FoodGrid from './Food/index';

const cx = classNames.bind(styles);

function BookingFood() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, movieTitle, time, selectedDay, showDate, currentDate: formattedDate, totalPrice: seatPrice } = location.state || {};
    const [selectedFoods, setSelectedFoods] = useState([]);

    const handleContinue = () => {
        const totalFoodPrice = calculateTotalPrice(selectedFoods);
        const totalPrice = seatPrice + totalFoodPrice;

        navigate('/showtime/bookingseat/payment', {
            state: {
                selectedFoods,
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
    console.log(selectedSeats)

    const handleFoodSelect = (food) => {
        setSelectedFoods((prevFoods) => {
            const existingFood = prevFoods.find(f => f._id === food._id);
            if (existingFood) {
                return prevFoods.map(f => f._id === food._id ? { ...f, quantity: f.quantity + 1 } : f);
            } else {
                return [...prevFoods, { ...food, quantity: 1 }];
            }
        });
    };

    const handleFoodUnselect = (food) => {
        setSelectedFoods((prevFoods) => {
            const existingFood = prevFoods.find(f => f._id === food._id);
            if (existingFood.quantity > 1) {
                return prevFoods.map(f => f._id === food._id ? { ...f, quantity: f.quantity - 1 } : f);
            } else {
                return prevFoods.filter(f => f._id !== food._id);
            }
        });
    };

    const calculateTotalPrice = (foods) => {
        return foods.reduce((total, food) => total + (food.foodPrice * food.quantity), 0);
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const totalFoodPrice = calculateTotalPrice(selectedFoods);
    const totalPrice = seatPrice + totalFoodPrice;

    return (
        <div className={cx('booking-food')}>
            <h1>Booking Food</h1>
            {movieTitle && time ? (
                <div className={cx('content')}>
                    <div className={cx('movie-info')}>
                        <p>
                            Movie: {movieTitle} · {time} · {selectedDay} · {showDate}
                        </p>
                    </div>
                    <div className={cx('selected-foods')}>
                        <div className={cx('seats-list')}>
                            <div className={cx('label')}>Chỗ ngồi:</div>
                            <div className={cx('seats')}>
                                {selectedSeats.join(', ')}
                            </div>
                        </div>
                        <div className={cx('label')}>Đồ ăn:</div>
                        <div className={cx('food-list')}>
                            {selectedFoods.map((food) => (
                                <div key={food._id} className={cx('food')}>
                                    {food.foodTitle} (x{food.quantity}){' '}
                                    <span className={cx('close')} onClick={() => handleFoodUnselect(food)}>
                                        ×
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <FoodGrid
                        selectedFoods={selectedFoods}
                        onFoodSelect={handleFoodSelect}
                    />
                    <div className={cx('total-price')}>
                        <div className={cx('label')}>Tạm tính</div>
                        <div className={cx('price')}>{formatCurrency(totalPrice)}</div>
                    </div>
                    <button
                        className={cx('continue-btn')}
                        onClick={handleContinue}
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

export default BookingFood;
