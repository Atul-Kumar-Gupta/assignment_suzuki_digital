import React, { useState } from 'react';
import styles from './UserManagementComponent.module.css';


const Detail = ({ selectedUser }) => {
  console.log(selectedUser)
  return (
    <>
    { selectedUser && (
      <div className={styles.detailView}>
        <h5>User Details</h5>
        <p><strong>Name:</strong> {selectedUser.user}</p>
        <p><strong>Age:</strong> {selectedUser.age}</p>
        <p><strong>Mobile:</strong> {selectedUser.mobile}</p>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>Interests:</strong> {selectedUser.interest.map(item=>item.INTEREST).join(', ')}</p>
      </div>
    )}
    </>

  )
}

export default Detail