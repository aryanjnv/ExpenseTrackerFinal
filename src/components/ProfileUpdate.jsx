import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileUpdate.module.css';
import useAuth from './useAuth';

const ProfileUpdate = () => {
  useAuth();
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDkAt3QMRrKPqkJpl7LNnFh7icac2hS0xU`, {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          return response.json();
        })
        .then((data) => {
          const profileData = data.users[0];
          setName(profileData.displayName || '');
          setPhotoUrl(profileData.photoUrl || '');
        })
        .catch(error => {
          console.error('Error fetching profile:', error.message);
        });
    }
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const handleUpdate = () => {
    const token = localStorage.getItem('token');

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDkAt3QMRrKPqkJpl7LNnFh7icac2hS0xU', {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        photoURL: photoUrl,
        displayName: name,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Profile updated successfully:', data);
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('Error updating profile:', error.message);
        alert('Failed to update profile. Please try again later.');
      });
  };

  const handleVerifyEmail = () => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDkAt3QMRrKPqkJpl7LNnFh7icac2hS0xU`, {
        method: 'POST',
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to send verification email');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Verification email sent successfully:', data);
          alert('Verification email sent successfully. Please check your email.');
        })
        .catch(error => {
          console.error('Error sending verification email:', error.message);
          alert('Failed to send verification email. Please try again later.');
        });
    }
  };

  const handleCancel = () => {
    navigate('/welcome');
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h2>Profile Update</h2>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="nameInput">Name:</label>
          <input 
            type="text" 
            id="nameInput" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="photoUrlInput">Photo URL:</label>
          <input 
            type="text" 
            id="photoUrlInput" 
            value={photoUrl} 
            onChange={(e) => setPhotoUrl(e.target.value)} 
          />
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleVerifyEmail}>Verify Email</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        <div className={styles.logoutButton}>
        <button onClick={handleLogout}>Logout</button>
    </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
