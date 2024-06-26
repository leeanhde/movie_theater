import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FeedbackReport.module.scss';

const cx = classNames.bind(styles);

const initialFeedbacks = [
    { id: 1, customerName: 'John Doe', content: 'Lorem ipsum dolor sit amet.', date: '2024-06-15', status: 'pending' },
    {
        id: 2,
        customerName: 'Jane Smith',
        content: 'Consectetur adipiscing elit.',
        date: '2024-06-16',
        status: 'processed',
    },
    // Add more initial feedback data here
];

function FeedbackReport() {
    const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
    const [filterStatus, setFilterStatus] = useState('all'); // all, pending, processed

    const handleMarkProcessed = (id) => {
        const updatedFeedbacks = feedbacks.map((feedback) =>
            feedback.id === id ? { ...feedback, status: 'processed' } : feedback,
        );
        setFeedbacks(updatedFeedbacks);
    };

    const filteredFeedbacks = feedbacks.filter((feedback) =>
        filterStatus === 'all' ? true : feedback.status === filterStatus,
    );

    return (
        <div className={cx('feedback-report')}>
            <h2 className={cx('header')}>Feedback Report</h2>
            <div className={cx('filters')}>
                <label htmlFor="statusFilter">Filter by Status:</label>
                <select
                    id="statusFilter"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={cx('filter-select')}
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="processed">Processed</option>
                </select>
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Customer Name</th>
                        <th className={cx('th')}>Content</th>
                        <th className={cx('th')}>Date</th>
                        <th className={cx('th')}>Status</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredFeedbacks.map((feedback) => (
                        <tr key={feedback.id}>
                            <td className={cx('td')}>{feedback.customerName}</td>
                            <td className={cx('td')}>{feedback.content}</td>
                            <td className={cx('td')}>{feedback.date}</td>
                            <td className={cx('td')}>
                                <span
                                    className={cx('status', {
                                        'status-pending': feedback.status === 'pending',
                                        'status-processed': feedback.status === 'processed',
                                    })}
                                >
                                    {feedback.status === 'pending' ? 'Pending' : 'Processed'}
                                </span>
                            </td>
                            <td className={cx('td')}>
                                <button
                                    className={cx('button', 'detail-button')}
                                    onClick={() => console.log(`View details of feedback ${feedback.id}`)}
                                >
                                    View Details
                                </button>
                                {feedback.status === 'pending' && (
                                    <button
                                        className={cx('button', 'mark-processed-button')}
                                        onClick={() => handleMarkProcessed(feedback.id)}
                                    >
                                        Mark Processed
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FeedbackReport;
