import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Staff', status: 'Active' },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', role: 'User', status: 'Inactive' },
    // Add more initial user data here
];

function ManageUser() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = users.filter(
            (user) =>
                user.username.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.deleted.toLowerCase().includes(term),
        );
        setFilteredUsers(filtered);
    };
    useEffect(()=>{
        async function main(){
            const list = await axios.get('http://localhost:9999/api/user/getAll');
            setUsers(list.data.user)    
            setFilteredUsers(list.data.user)    
        }
        main();
    },[]);

    const handleDeleteUser = (userId) => {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    return (
        <div className={cx('manage-user')}>
            <h2 className={cx('header')}>Manage Users</h2>
            <div className={cx('search-bar')}>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={cx('search-input')}
                />
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th className={cx('th')}>Name</th>
                        <th className={cx('th')}>Email</th>
                        <th className={cx('th')}>Status</th>
                        <th className={cx('th')}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers?.map((user) => (
                        <tr key={user._id}>
                            <td className={cx('td')}>{user?.username}</td>
                            <td className={cx('td')}>{user?.email}</td>
                            <td
                                // className={cx('td', {
                                //     'status-active': user.deleted === 'Active',
                                //     'status-inactive': user.deleted === 'Inactive',
                                // })}
                            >
                                {user?.deleted}
                            </td>
                            <td className={cx('td')}>
                                {/* <button className={cx('button')} onClick={() => console.log(`Edit user ${user.id}`)}>
                                    Edit
                                </button> */}
                                <button className={cx('button')} onClick={() => handleDeleteUser(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className={cx('add-user-form')}>
                <h3 className={cx('form-header')}>Add New User</h3>
                <form className={cx('form')}>
                    <label className={cx('form-label')}>
                        Name:
                        <input type="text" className={cx('form-input')} />
                    </label>
                    <label className={cx('form-label')}>
                        Email:
                        <input type="email" className={cx('form-input')} />
                    </label>
                    <label className={cx('form-label')}>
                        Role:
                        <select className={cx('form-input')}>
                            <option value="Admin">Admin</option>
                            <option value="Staff">Staff</option>
                            <option value="User">User</option>
                        </select>
                    </label>
                    <label className={cx('form-label')}>
                        Status:
                        <select className={cx('form-input')}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </label>
                    <button type="submit" className={cx('form-submit')}>
                        Add User
                    </button>
                </form>
            </div> */}
        </div>
    );
}

export default ManageUser;
