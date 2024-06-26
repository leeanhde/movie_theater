import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageStaffSchedule.module.scss';

const cx = classNames.bind(styles);

const initialSchedules = [
    {
        id: 1,
        staffName: 'John Doe',
        shift: 'Morning',
        workDate: '2024-06-15',
        task: 'Ticket checking',
        workTime: '8:00 AM - 12:00 PM',
        status: 'Pending',
    },
    {
        id: 2,
        staffName: 'Jane Smith',
        shift: 'Afternoon',
        workDate: '2024-06-15',
        task: 'Customer service',
        workTime: '1:00 PM - 5:00 PM',
        status: 'Checked In',
    },
    // Add more initial schedule data here
];

const ManageStaffSchedule = () => {
    const [schedules, setSchedules] = useState(initialSchedules);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [formData, setFormData] = useState({
        id: '',
        staffName: '',
        shift: '',
        workDate: '',
        task: '',
        workTime: '',
        status: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddSchedule = () => {
        // Add schedule logic
        // For demonstration, let's generate a temporary id
        const newSchedule = { ...formData, id: Date.now() };
        setSchedules([...schedules, newSchedule]);
        setFormData({
            id: '',
            staffName: '',
            shift: '',
            workDate: '',
            task: '',
            workTime: '',
            status: '',
        });
    };

    const handleEditSchedule = () => {
        // Edit schedule logic
        const updatedSchedules = schedules.map((schedule) =>
            schedule.id === formData.id ? { ...formData } : schedule,
        );
        setSchedules(updatedSchedules);
        setFormData({
            id: '',
            staffName: '',
            shift: '',
            workDate: '',
            task: '',
            workTime: '',
            status: '',
        });
        setFormMode('add');
    };

    const handleDeleteSchedule = (id) => {
        // Delete schedule logic
        const updatedSchedules = schedules.filter((schedule) => schedule.id !== id);
        setSchedules(updatedSchedules);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formMode === 'add') {
            handleAddSchedule();
        } else if (formMode === 'edit') {
            handleEditSchedule();
        }
    };

    const handleEditClick = (schedule) => {
        setFormMode('edit');
        setFormData(schedule);
    };

    const handleRejectClick = (id) => {
        // Reject schedule logic
        const updatedSchedules = schedules.map((schedule) =>
            schedule.id === id ? { ...schedule, status: 'Rejected' } : schedule,
        );
        setSchedules(updatedSchedules);
    };

    return (
        <div className={cx('manage-staff-schedule')}>
            <h2 className={cx('header')}>Manage Staff Schedule</h2>

            <div className={cx('form-container')}>
                <h3>{formMode === 'add' ? 'Add Schedule' : 'Edit Schedule'}</h3>
                <form onSubmit={handleFormSubmit}>
                    <div className={cx('form-group')}>
                        <label htmlFor="staffName">Staff Name</label>
                        <input
                            type="text"
                            id="staffName"
                            name="staffName"
                            value={formData.staffName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="shift">Shift</label>
                        <select id="shift" name="shift" value={formData.shift} onChange={handleInputChange} required>
                            <option value="">Select Shift</option>
                            <option value="Morning">Morning</option>
                            <option value="Afternoon">Afternoon</option>
                            <option value="Evening">Evening</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="workDate">Work Date</label>
                        <input
                            type="date"
                            id="workDate"
                            name="workDate"
                            value={formData.workDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="task">Task</label>
                        <input
                            type="text"
                            id="task"
                            name="task"
                            value={formData.task}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="workTime">Work Time</label>
                        <input
                            type="text"
                            id="workTime"
                            name="workTime"
                            value={formData.workTime}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Checked In">Checked In</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <button type="submit" className={cx('button')}>
                            {formMode === 'add' ? 'Add Schedule' : 'Save Changes'}
                        </button>
                        {formMode === 'edit' && (
                            <button type="button" className={cx('button', 'cancel')} onClick={() => setFormMode('add')}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className={cx('schedule-list')}>
                <h3>Schedule List</h3>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Staff Name</th>
                            <th>Shift</th>
                            <th>Work Date</th>
                            <th>Task</th>
                            <th>Work Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule) => (
                            <tr key={schedule.id}>
                                <td>{schedule.staffName}</td>
                                <td>{schedule.shift}</td>
                                <td>{schedule.workDate}</td>
                                <td>{schedule.task}</td>
                                <td>{schedule.workTime}</td>
                                <td>{schedule.status}</td>
                                <td>
                                    <button className={cx('action-button')} onClick={() => handleEditClick(schedule)}>
                                        Edit
                                    </button>
                                    {schedule.status !== 'Rejected' && (
                                        <button
                                            className={cx('action-button', 'reject')}
                                            onClick={() => handleRejectClick(schedule.id)}
                                        >
                                            Reject
                                        </button>
                                    )}
                                    <button
                                        className={cx('action-button', 'delete')}
                                        onClick={() => handleDeleteSchedule(schedule.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageStaffSchedule;
