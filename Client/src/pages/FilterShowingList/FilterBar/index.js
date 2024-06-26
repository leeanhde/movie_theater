import React from 'react';
import classNames from 'classnames/bind';
import styles from './FilterBar.module.scss';

const FilterBar = ({ genre, setGenre, country, setCountry, year, setYear, search, setSearch }) => {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('filterBar')}>
            <select className={cx('filterSelect')} value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">Thể loại</option>
                <option value="Hành Động">Hành Động</option>
                <option value="Hài">Hài</option>
                <option value="Kinh Dị">Kinh Dị</option>
                {/* Add more genres as needed */}
            </select>
            <select className={cx('filterSelect')} value={country} onChange={(e) => setCountry(e.target.value)}>
                <option value="">Quốc gia</option>
                <option value="Việt Nam">Việt Nam</option>
                <option value="Mỹ">Mỹ</option>
                <option value="Hàn Quốc">Hàn Quốc</option>
                {/* Add more countries as needed */}
            </select>
            <select className={cx('filterSelect')} value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Năm</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                {/* Add more years as needed */}
            </select>
            <input
                type="text"
                className={cx('filterInput')}
                placeholder="Tìm theo tên phim"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
};

export default FilterBar;
