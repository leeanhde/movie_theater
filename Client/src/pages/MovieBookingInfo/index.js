import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MovieBookingInfo.module.scss';

const cx = classNames.bind(styles);

const bookingDetails = {
    1: {
        duration: '2 hours',
        showDate: '2024-06-15',
        genre: 'Action',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        seats: 'A1, A2',
        theater: 'Theater 1',
        totalPrice: '$200000',
        bookedTime: '2024-06-14 10:00 AM',
        theaterAddress: '123 Theater St, City, Country',
    },
    // Add more booking details as needed
};

function MovieBookingInfo() {
    const { bookingId } = useParams();
    const details = bookingDetails[bookingId];

    if (!details) {
        return <div>Booking details not found.</div>;
    }

    return (
        <div className={cx('container')}>
            <h2 className={cx('header')}>Booking Information</h2>
            <div className={cx('details')}>
                <p>
                    <strong>Duration:</strong> {details.duration}
                </p>
                <p>
                    <strong>Show Date:</strong> {details.showDate}
                </p>
                <p>
                    <strong>Genre:</strong> {details.genre}
                </p>
                <p>
                    <strong>Description:</strong> {details.description}
                </p>
                <p>
                    <strong>Seats:</strong> {details.seats}
                </p>
                <p>
                    <strong>Theater:</strong> {details.theater}
                </p>
                <p>
                    <strong>Total Price:</strong> {details.totalPrice}
                </p>
                <p>
                    <strong>Booked Time:</strong> {details.bookedTime}
                </p>
                <p>
                    <strong>Theater Address:</strong> {details.theaterAddress}
                </p>
            </div>
        </div>
    );
}

export default MovieBookingInfo;
