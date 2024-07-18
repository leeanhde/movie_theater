import classNames from 'classnames/bind';
import styles from './YourTicket.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
    const [bookedTicket,setBookedTicket] = useState([]);
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user')) || {};
        async function main(){
            const ticket = await axios.get("http://localhost:9999/api/booking/history/" + user?.id)
            console.log("🚀 ~ main ~ ticket:", ticket.data)
            setBookedTicket(ticket.data)
        }
        main();
    },[])
    return (
        <div className={cx('booking-tickets')}>
            <h1>Booked Tickets</h1>
            {bookedTicket.map((ticket) => (
                <div key={ticket._id} className={cx('ticket')}>
                    <div className={cx('ticket-info')}>
                        <h2>{ticket?.movieId?.movieNameEnglish}</h2>
                        <p>
                            <strong>Duration:</strong> {ticket?.movieId?.duration}
                        </p>
                        <p>
                            <strong>Show Date:</strong> {ticket.date}
                        </p>
                        <p>
                            <strong>Genre:</strong> {ticket.genre}
                        </p>
                        <p>
                            <strong>Description:</strong> {ticket?.movieId?.content}
                        </p>
                        <p>
                            <strong>Seats:</strong> {ticket.seats.join(',')}
                        </p>
                        {/* <p>
                            <strong>Theater:</strong> {ticket.theater}
                        </p> */}
                        <p>
                            <strong>Total Price:</strong> ${ticket.totalAmount}
                        </p>
                        <p>
                            <strong>Booked Time:</strong> {new Date(ticket.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })}
                        </p>
                        {/* <p>
                            <strong>Theater Address:</strong> {ticket.theaterAddress}
                        </p> */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default YourTicket;
