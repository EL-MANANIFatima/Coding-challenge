import React from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.heading}>Dashboard</div>
            <a href="/">Posts</a>
        </div>
    );
};

export default Navbar;
