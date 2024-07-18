import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageRevenua.module.scss';
import TransactionList from './TransactionList';
import RevenueChart from './RevenueChart';
import axios from 'axios';

const cx = classNames.bind(styles);

const initialTransactions = [
    { id: 1, customerName: 'John Doe', amount: 1500000, transactionDate: '2024-06-01', paymentMethod: 'Credit Card' },
    { id: 2, customerName: 'Jane Smith', amount: 1200000, transactionDate: '2024-06-02', paymentMethod: 'Cash' },
    {
        id: 3,
        customerName: 'Michael Johnson',
        amount: 1800000,
        transactionDate: '2024-06-03',
        paymentMethod: 'Credit Card',
    },
    // Add more initial transaction data here
];

function ManageRevenue() {
    const [transactions, setTransactions] = useState(initialTransactions);
    const [filteredTransactions, setFilteredTransactions] = useState(initialTransactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [revenue, setRevenue] = useState({});
    const handleSearch = (event) => {
        const term = event.target?.value?.toLowerCase();
        setSearchTerm(term);
        const filtered = transactions.filter(
            (transaction) =>
                transaction?.userId?.fullName.toLowerCase().includes(term)
        );
        setFilteredTransactions(filtered);
    };
    useEffect(() => {
        async function main() {
            const listTrans = await axios.get('http://localhost:9999/api/revuene/listTransaction');
            const revenue = await axios.get('http://localhost:9999/api/revuene/revenue');
            console.log("🚀 ~ main ~ revenue:", revenue.data)
            
            setRevenue(revenue.data);
            setTransactions(listTrans.data.paidBookings);
            setFilteredTransactions(listTrans.data.paidBookings);
        }
        main()
    }, []);
    return (
        <div className={cx('revenue-management')}>
            <h2 className={cx('header')}>Revenue Management</h2>
            <div className={cx('overview')}>
                <div className={cx('overview-item')}>
                    <h3>Daily Revenue</h3>
                    <p>${revenue.dailyRevenue?.toLocaleString()}</p>
                </div>
                <div className={cx('overview-item')}>
                    <h3>Weekly Revenue</h3>
                    <p>${revenue.weeklyRevenue?.toLocaleString()}</p>
                </div>
                <div className={cx('overview-item')}>
                    <h3>Monthly Revenue</h3>
                    <p>${revenue.monthlyRevenue?.toLocaleString()}</p>
                </div>
                <div className={cx('overview-item')}>
                    <h3>Yearly Revenue</h3>
                    <p>${revenue.yearlyRevenue?.toLocaleString()}</p>
                </div>
            </div>
            <RevenueChart transactions={transactions} />
            <div className={cx('transaction-list')}>
                <h3 className={cx('list-header')}>Transaction Details</h3>
                <div className={cx('search-bar')}>
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className={cx('search-input')}
                    />
                </div>
                <TransactionList transactions={filteredTransactions} />
                <div className={cx('report-buttons')}>
                    <button className={cx('button')} onClick={() => console.log('Export report')}>
                        Export Revenue Report
                    </button>
                    <button className={cx('button')} onClick={() => console.log('Print report')}>
                        Print Revenue Report
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ManageRevenue;
