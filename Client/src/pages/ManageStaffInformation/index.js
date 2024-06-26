import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageStaffInformation.module.scss';

const cx = classNames.bind(styles);

const initialStaff = [
    { id: 1, name: 'John Doe', position: 'Manager', workDate: '2024-06-15', status: 'Active' },
    { id: 2, name: 'Jane Smith', position: 'Staff', workDate: '2024-06-16', status: 'Inactive' },
    // Add more initial staff data here
];

const ManagementStaffInformation = () => {
    const [staffList, setStaffList] = useState(initialStaff);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ name: '', position: '', workDate: '', status: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddStaff = () => {
        setStaffList([...staffList, { ...formData, id: staffList.length + 1 }]);
        setFormData({ name: '', position: '', workDate: '', status: '' });
    };

    const handleEditStaff = () => {
        const updatedStaffList = [...staffList];
        updatedStaffList[editIndex] = { ...formData, id: updatedStaffList[editIndex].id };
        setStaffList(updatedStaffList);
        setFormData({ name: '', position: '', workDate: '', status: '' });
        setIsEditing(false);
        setEditIndex(null);
    };

    const handleDeleteStaff = (index) => {
        const updatedStaffList = staffList.filter((staff, i) => i !== index);
        setStaffList(updatedStaffList);
    };

    const handleEditClick = (staff, index) => {
        setIsEditing(true);
        setEditIndex(index);
        setFormData({ ...staff });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditIndex(null);
        setFormData({ name: '', position: '', workDate: '', status: '' });
    };

    const filteredStaffList = staffList.filter(
        (staff) =>
            staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.workDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
            staff.status.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <div className={cx('staff-information-management')}>
            <h2 className={cx('header')}>Staff Information Management</h2>
            <div className={cx('actions')}>
                <input
                    type="text"
                    placeholder="Search staff..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cx('search-input')}
                />
                <button className={cx('button', 'add-button')} onClick={() => setIsEditing(true)}>
                    Add Staff
                </button>
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Work Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredStaffList.map((staff, index) => (
                        <tr key={index}>
                            <td>{staff.name}</td>
                            <td>{staff.position}</td>
                            <td>{staff.workDate}</td>
                            <td>{staff.status}</td>
                            <td>
                                <button
                                    className={cx('button', 'edit-button')}
                                    onClick={() => handleEditClick(staff, index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={cx('button', 'delete-button')}
                                    onClick={() => handleDeleteStaff(index)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {isEditing && (
                <div className={cx('form-container')}>
                    <h3>{editIndex !== null ? 'Edit Staff' : 'Add New Staff'}</h3>
                    <div className={cx('form-group')}>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Position:</label>
                        <input type="text" name="position" value={formData.position} onChange={handleInputChange} />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Work Date:</label>
                        <input type="date" name="workDate" value={formData.workDate} onChange={handleInputChange} />
                    </div>
                    <div className={cx('form-group')}>
                        <label>Status:</label>
                        <input type="text" name="status" value={formData.status} onChange={handleInputChange} />
                    </div>
                    <div className={cx('form-actions')}>
                        <button
                            className={cx('button', 'save-button')}
                            onClick={editIndex !== null ? handleEditStaff : handleAddStaff}
                        >
                            {editIndex !== null ? 'Save Changes' : 'Add Staff'}
                        </button>
                        <button className={cx('button', 'cancel-button')} onClick={handleCancelEdit}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManagementStaffInformation;
