import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './FoodGrid.module.scss';

const cx = classNames.bind(styles);

const FoodGrid = ({ selectedFoods = [], onFoodSelect }) => {
    const [availableFoods, setAvailableFoods] = useState([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:9999/api/food/list');
                setAvailableFoods(response.data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        fetchFoods();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    const formatCurrency = (amount) => {
        return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };

    const handleFoodClick = (food) => {
        onFoodSelect(food);
    };

    return (
        <div className={cx('food-grid')}>
            <div className={cx('legend')}>
                <div className={cx('legend-item', 'available')}>Đồ ăn có sẵn</div>
                {/*<div className={cx('legend-item', 'selected')}>Đã chọn</div>*/}
            </div>
            <div className={cx('row')}>
                {availableFoods.map((food) => {
                    const isSelected = selectedFoods.find(f => f._id === food._id);
                    const foodType = isSelected ? 'selected' : 'available';

                    return (
                        <div
                            key={food._id}
                            className={cx('food', foodType)}
                            onClick={() => handleFoodClick(food)}
                        >
                            <img src={food.foodImage} alt={food.foodTitle} className={cx('food-image')} />
                            <div className={cx('food-details')}>
                                <h3>{food.foodTitle}</h3>
                                <p>{food.foodDescription}</p>
                                <p>{formatCurrency(food.foodPrice)}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FoodGrid;
