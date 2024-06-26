import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ManagerUser.module.scss';

const cx = classNames.bind(styles);

const initialCustomers = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        status: 'Active',
        bookings: [
            { id: 1, movie: 'Movie A' },
            { id: 2, movie: 'Movie B' },
        ],
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '987-654-3210',
        status: 'Inactive',
        bookings: [{ id: 3, movie: 'Movie C' }],
    },
    // Add more initial customer data here
];

function ManageUserInformation() {
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleViewBookings = (bookings) => {
        // Handle showing the bookings (this could be a modal or a separate component)
        console.log('Bookings:', bookings);
    };

    const handleMovieClick = (bookingId) => {
        navigate(`/moviebookinginfo/${bookingId}`);
    };

    return (
        <div className={cx('container')}>
            <h2 className={cx('header')}>Manage User Information</h2>
            <input
                type="text"
                placeholder="Search customers"
                value={searchTerm}
                onChange={handleSearch}
                className={cx('input')}
            />
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Name</th>
                        <th className={cx('th')}>Email</th>
                        <th className={cx('th')}>Phone</th>
                        <th className={cx('th')}>Status</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map((customer) => (
                        <tr key={customer.id}>
                            <td className={cx('td')}>{customer.name}</td>
                            <td className={cx('td')}>{customer.email}</td>
                            <td className={cx('td')}>{customer.phone}</td>
                            <td className={cx('td')}>{customer.status}</td>
                            <td className={cx('td')}>
                                <button className={cx('button')} onClick={() => handleViewBookings(customer.bookings)}>
                                    View Bookings
                                </button>
                                <div>
                                    {customer.bookings.map((booking) => (
                                        <div key={booking.id}>
                                            <button
                                                className={cx('button')}
                                                onClick={() => handleMovieClick(booking.id)}
                                            >
                                                {booking.movie}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageUserInformation;
