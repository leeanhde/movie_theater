import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TicketForm.module.scss';

const cx = classNames.bind(styles);

function TicketForm({ onAdd, onEdit, isEditing, ticket }) {
    const [formData, setFormData] = useState({
        id: ticket ? ticket.id : null,
        code: ticket ? ticket.code : '',
        movie: ticket ? ticket.movie : '',
        showTime: ticket ? ticket.showTime : '',
        seat: ticket ? ticket.seat : '',
        customer: ticket ? ticket.customer : '',
        status: ticket ? ticket.status : '',
    });

    useEffect(() => {
        if (isEditing && ticket) {
            setFormData({
                id: ticket.id,
                code: ticket.code,
                movie: ticket.movie,
                showTime: ticket.showTime,
                seat: ticket.seat,
                customer: ticket.customer,
                status: ticket.status,
            });
        } else {
            setFormData({
                id: null,
                code: '',
                movie: '',
                showTime: '',
                seat: '',
                customer: '',
                status: '',
            });
        }
    }, [isEditing, ticket]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onEdit(formData);
        } else {
            onAdd({ ...formData, id: new Date().getTime() }); // temporary id generation
        }
        setFormData({
            id: null,
            code: '',
            movie: '',
            showTime: '',
            seat: '',
            customer: '',
            status: '',
        });
    };

    return (
        <div className={cx('ticket-form')}>
            <h3>{isEditing ? 'Edit Ticket' : 'Add Ticket'}</h3>
            <form onSubmit={handleSubmit}>
                <div className={cx('form-group')}>
                    <label>Ticket Code:</label>
                    <input type="text" name="code" value={formData.code} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Movie:</label>
                    <input type="text" name="movie" value={formData.movie} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Show Time:</label>
                    <input type="text" name="showTime" value={formData.showTime} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Seat:</label>
                    <input type="text" name="seat" value={formData.seat} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Customer:</label>
                    <input type="text" name="customer" value={formData.customer} onChange={handleChange} required />
                </div>
                <div className={cx('form-group')}>
                    <label>Status:</label>
                    <input type="text" name="status" value={formData.status} onChange={handleChange} required />
                </div>
                <button type="submit">{isEditing ? 'Update Ticket' : 'Add Ticket'}</button>
            </form>
        </div>
    );
}

export default TicketForm;
