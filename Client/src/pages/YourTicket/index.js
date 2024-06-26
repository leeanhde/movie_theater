import classNames from 'classnames/bind';
import styles from './YourTicket.module.scss';

function YourTicket() {
    const cx = classNames.bind(styles);
    // Dummy data for booked tickets
    const bookedTickets = [
        {
            id: 1,
            movieTitle: 'Movie 1',
            duration: '2 hours',
            showDate: '2024-06-15',
            genre: 'Action',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            seats: 'A1, A2',
            theater: 'Theater 1',
            totalPrice: 200000,
            bookedTime: '2024-06-14 10:00 AM',
            theaterAddress: '123 Theater St, City, Country',
        },
        {
            id: 2,
            movieTitle: 'Movie 2',
            duration: '1 hour 30 minutes',
            showDate: '2024-06-16',
            genre: 'Comedy',
            description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            seats: 'B5, B6',
            theater: 'Theater 2',
            totalPrice: 150000,
            bookedTime: '2024-06-14 11:00 AM',
            theaterAddress: '456 Theater St, City, Country',
        },
        // Add more booked tickets as needed
    ];

    return (
        <div className={cx('booking-tickets')}>
            <h1>Booked Tickets</h1>
            {bookedTickets.map((ticket) => (
                <div key={ticket.id} className={cx('ticket')}>
                    <div className={cx('ticket-info')}>
                        <h2>{ticket.movieTitle}</h2>
                        <p>
                            <strong>Duration:</strong> {ticket.duration}
                        </p>
                        <p>
                            <strong>Show Date:</strong> {ticket.showDate}
                        </p>
                        <p>
                            <strong>Genre:</strong> {ticket.genre}
                        </p>
                        <p>
                            <strong>Description:</strong> {ticket.description}
                        </p>
                        <p>
                            <strong>Seats:</strong> {ticket.seats}
                        </p>
                        <p>
                            <strong>Theater:</strong> {ticket.theater}
                        </p>
                        <p>
                            <strong>Total Price:</strong> ${ticket.totalPrice}
                        </p>
                        <p>
                            <strong>Booked Time:</strong> {ticket.bookedTime}
                        </p>
                        <p>
                            <strong>Theater Address:</strong> {ticket.theaterAddress}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default YourTicket;
