import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import styles from './Layout.module.css'; 
type LayoutProps = {
    children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
