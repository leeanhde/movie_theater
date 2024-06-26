import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TicketCodeManagement.module.scss';
import TicketList from './TicketList';
import TicketForm from './TicketForm';

const cx = classNames.bind(styles);

const initialTickets = [
    {
        id: 1,
        code: 'TCK001',
        movie: 'Movie A',
        showTime: '2024-06-15 10:00 AM',
        seat: 'A1',
        customer: 'John Doe',
        status: 'Sold',
    },
    {
        id: 2,
        code: 'TCK002',
        movie: 'Movie B',
        showTime: '2024-06-15 13:00 PM',
        seat: 'B3',
        customer: 'Jane Smith',
        status: 'Sold',
    },
    // Add more initial ticket data here
];

function TicketCodeManagement() {
    const [tickets, setTickets] = useState(initialTickets);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleAddTicket = (ticket) => {
        setTickets([...tickets, ticket]);
    };

    const handleEditTicket = (ticket) => {
        const updatedTickets = tickets.map((t) => (t.id === ticket.id ? ticket : t));
        setTickets(updatedTickets);
        setSelectedTicket(null);
        setIsEditing(false);
    };

    const handleDeleteTicket = (id) => {
        const updatedTickets = tickets.filter((t) => t.id !== id);
        setTickets(updatedTickets);
    };

    const handleEditButtonClick = (ticket) => {
        setSelectedTicket(ticket);
        setIsEditing(true);
    };

    return (
        <div className={cx('ticket-code-management')}>
            <h2 className={cx('header')}>Ticket Code Management</h2>
            <TicketList tickets={tickets} onEdit={handleEditButtonClick} onDelete={handleDeleteTicket} />
            <TicketForm
                onAdd={handleAddTicket}
                onEdit={handleEditTicket}
                isEditing={isEditing}
                ticket={selectedTicket}
            />
        </div>
    );
}

export default TicketCodeManagement;
