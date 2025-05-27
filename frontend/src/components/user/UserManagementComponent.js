import React, { useState } from 'react';
import styles from './UserManagementComponent.module.css';

const initialUser = {
  user: '',
  interest: '',
  age: '',
  mobile: '',
  email: '',
};

const UserManagementComponent = () => {
  const [editIndex, setEditIndex] = useState(null);

  
  

  const handleEdit = (index) => {
    const user = users[index];
    setFormData({
      ...user,
      interest: user.interest.join(', '),
    });
    setEditIndex(index);
    setSelectedUser(null);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setEditIndex(null);
    setFormData(initialUser);
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>User Management</div>

      
     

     
    </div>
  );
};

export default UserManagementComponent;
