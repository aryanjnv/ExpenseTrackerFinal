import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Welcome.module.css'; // Import CSS module


const Welcome = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h2>Welcome to Expense Tracker</h2>
                    <p>Your profile is incomplete.<Link to="/profileUpdate" className={styles.completeLink}>Complete Now</Link></p>
                </div>
                <div className={styles.expenseButton}>
                    <Link to="/expenses" className={styles.expenseLink}>Expense</Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
