import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User has successfully logged in');
            localStorage.setItem('token', user.accessToken);
            localStorage.setItem('userId', user.uid);
            dispatch({ type: 'LOGIN_SUCCESS', payload: { userId: user.uid, token: user.accessToken } });
            navigate('/welcome');
        } catch (err) {
            setError('Password is Wrong');
        }
    };
    const handleForgotPassword = () => {
        
        navigate('/forgot-password');
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className={styles['error-message']}>{error}</p>}
                <button type="submit">Login</button>
                <p className={styles['forgot-password']} onClick={handleForgotPassword}>Forgot Password?</p>
            </form>
            <p className={styles['new-user']}>New User? <a href="/signup">Register</a></p>
        </div>
    );
};

export default Login;
