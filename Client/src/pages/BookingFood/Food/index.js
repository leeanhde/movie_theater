import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FoodGrid.module.scss';

const cx = classNames.bind(styles);

const FoodGrid = ({ selectedFoods = [], onFoodSelect }) => {
    const [availableFoods] = useState([
        { foodId: 1, foodTitle: 'Popcorn', foodPrice: 50000 },
        { foodId: 2, foodTitle: 'Soda', foodPrice: 30000 },
        { foodId: 3, foodTitle: 'Nachos', foodPrice: 70000 },
        { foodId: 4, foodTitle: 'Hotdog', foodPrice: 60000 },
    ]);

    const handleFoodClick = (food) => {
        onFoodSelect(food);
    };

    return (
        <div className={cx('food-grid')}>
            <div className={cx('legend')}>
                <div className={cx('legend-item', 'available')}>Đồ ăn có sẵn</div>
                <div className={cx('legend-item', 'selected')}>Đã chọn</div>
            </div>
            <div className={cx('row')}>
                {availableFoods.map((food) => {
                    const isSelected = selectedFoods.find(f => f.foodId === food.foodId);
                    const foodType = isSelected ? 'selected' : 'available';

                    return (
                        <div
                            key={food.foodId}
                            className={cx('food', foodType)}
                            onClick={() => handleFoodClick(food)}
                        >
                            {food.foodTitle} - {food.foodPrice}đ
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FoodGrid;
