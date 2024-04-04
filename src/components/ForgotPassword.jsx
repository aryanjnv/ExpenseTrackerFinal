import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { auth } from '../firebase/FirebaseConfig'; 
import styles from './ForgotPassword.module.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 

        try {
            await sendPasswordResetEmail(auth, email);
            setError(null); 
            alert('Password reset link sent to your email.'); 
            navigate('/login');
        } catch (err) {
            setError('Error sending password reset email. Please try again later.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className={styles.container}>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="emailInput">Email:</label>
                    <input 
                        type="email" 
                        id="emailInput" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
