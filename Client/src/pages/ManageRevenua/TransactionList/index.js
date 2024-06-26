import React from 'react';
import classNames from 'classnames/bind';
import styles from '../ManageRevenua.module.scss';

const cx = classNames.bind(styles);

function TransactionList({ transactions }) {
    return (
        <table className={cx('table')}>
            <thead>
                <tr>
                    <th className={cx('th')}>Transaction ID</th>
                    <th className={cx('th')}>Customer Name</th>
                    <th className={cx('th')}>Amount</th>
                    <th className={cx('th')}>Transaction Date</th>
                    <th className={cx('th')}>Payment Method</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                        <td className={cx('td')}>{transaction.id}</td>
                        <td className={cx('td')}>{transaction.customerName}</td>
                        <td className={cx('td')}>${transaction.amount.toLocaleString()}</td>
                        <td className={cx('td')}>{transaction.transactionDate}</td>
                        <td className={cx('td')}>{transaction.paymentMethod}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TransactionList;
