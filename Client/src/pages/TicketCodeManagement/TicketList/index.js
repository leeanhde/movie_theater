import React from 'react';
import classNames from 'classnames/bind';
import styles from './TicketList.module.scss';

const cx = classNames.bind(styles);

function TicketList({ tickets, onEdit, onDelete }) {
    return (
        <div className={cx('ticket-list')}>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Ticket Code</th>
                        <th className={cx('th')}>Movie</th>
                        <th className={cx('th')}>Show Time</th>
                        <th className={cx('th')}>Seat</th>
                        <th className={cx('th')}>Customer</th>
                        <th className={cx('th')}>Status</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket.id}>
                            <td className={cx('td')}>{ticket.code}</td>
                            <td className={cx('td')}>{ticket.movie}</td>
                            <td className={cx('td')}>{ticket.showTime}</td>
                            <td className={cx('td')}>{ticket.seat}</td>
                            <td className={cx('td')}>{ticket.customer}</td>
                            <td className={cx('td')}>{ticket.status}</td>
                            <td className={cx('td')}>
                                <button className={cx('button')} onClick={() => onEdit(ticket)}>
                                    Edit
                                </button>
                                <button className={cx('button')} onClick={() => onDelete(ticket.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketList;
