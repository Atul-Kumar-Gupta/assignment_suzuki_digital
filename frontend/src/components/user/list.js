import React, { useEffect, useState } from 'react';
import styles from './UserManagementComponent.module.css';
import { v1_get_users } from '@/action/user';

const List = ({ setEditIndex, setSelectedUser, refresh }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    v1_get_users().then(res => {
      if (res.status) {
        setUsers(res.result.data)
      }
    })
  }, [refresh])

  const handleEdit = (user) => {
    setEditIndex(user);
    setSelectedUser(null);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setEditIndex(null);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Interest</th>
          <th>Age</th>
          <th>Mobile</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={i}>
            <td>{u.user}</td>
            <td>{u.interest.map(item => item.INTEREST).join(', ')}</td>
            <td>{u.age}</td>
            <td>{u.mobile}</td>
            <td>{u.email}</td>
            <td className={styles.actions}>
              <button className={styles.button} onClick={() => handleView(u)}>View</button>
              <button className={styles.button} onClick={() => handleEdit(u)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default List