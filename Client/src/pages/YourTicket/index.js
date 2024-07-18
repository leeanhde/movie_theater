import classNames from 'classnames/bind';
import styles from './YourTicket.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function YourTicket() {
    const cx = classNames.bind(styles);
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
            <h2>Booked Tickets</h2>
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
