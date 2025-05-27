import React, { useState, useEffect } from 'react';
import styles from './UserManagementComponent.module.css';
import { v1_add_user, v1_edit_user } from '@/action/user';
import { toast } from 'react-toastify';

const initialUser = {
    user: '',
    interest: '',
    age: '',
    mobile: '',
    email: '',
};

const Form = ({ editIndex, setEditIndex, selectedUser, setSelectedUser, refresh, setRefresh }) => {
    const [formData, setFormData] = useState(initialUser);

    // Populate form with selected user data when editing
    useEffect(() => {
        if (editIndex) {
            setFormData({
                ...editIndex,
                interest: editIndex.interest.map(item=>item.INTEREST)?.join(', ') || '',
            });
        }
    }, [editIndex]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            ...formData,
            age: parseInt(formData.age),
            mobile: parseInt(formData.mobile),
            interestArray: formData.interest.split(',').map((i) => i.trim()),
        };

        if (editIndex) {
            const updatedUsers = {
                ...formData,
                id: editIndex.USER_ID,
                age: parseInt(formData.age),
                mobile: parseInt(formData.mobile),
                interestArray: formData.interest.split(',').map((i) => i.trim()),
            };
            const res = await v1_edit_user(updatedUsers);
            if (res.status) {
                toast.success(res.result.message);
                setRefresh(!refresh);

            } else {
                toast.error(res.result.message || 'Failed to add user.');
            }
            setEditIndex(null);
            toast.success('User updated successfully!');
        } else {
            const res = await v1_add_user(newUser);
            if (res.status) {
                toast.success(res.result.message);
                setRefresh(!refresh);

            } else {
                toast.error(res.result.message || 'Failed to add user.');
            }
        }

        setFormData(initialUser);
        setSelectedUser(null);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input className={styles.input} type="text" name="user" value={formData.user} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Interests (comma separated)</label>
                <input className={styles.input} type="text" name="interest" value={formData.interest} onChange={handleChange} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Age</label>
                <input className={styles.input} type="number" name="age" value={formData.age} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Mobile</label>
                <input className={styles.input} type="number" name="mobile" value={formData.mobile} onChange={handleChange} required />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <button type="submit" className={styles.button}>
                {editIndex !== null ? 'Update User' : 'Add User'}
            </button>
        </form>
    );
};

export default Form;
