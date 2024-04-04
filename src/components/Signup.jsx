import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import styles from './Signup.module.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();

        // Validate if all fields are filled
        if (!email || !password || !confirmPassword) {
            setError('All fields are mandatory');
            return;
        }

        // Validate if password and confirm password match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User has successfully signed up:', userCredential.user);
            setSuccessMessage('User has successfully signed up');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {error && <p className={styles['error-message']}>{error}</p>}
                {successMessage && <p className={styles['success-message']}>{successMessage}</p>}
                <button type="submit">Signup</button>
            </form>
            <p className={styles['already-account']}>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
