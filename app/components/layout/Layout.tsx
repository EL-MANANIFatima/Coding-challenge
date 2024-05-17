import React, { ReactNode } from 'react';
import Navbar from '../navbar/Navbar';
import styles from './Layout.module.css'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
type LayoutProps = {
    children: ReactNode;
};

//This components definds the Layout of the project
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.container}>
             <ToastContainer 
                position="top-right" 
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="toast-container" 
                toastClassName="toast-body" 
            />
            <Navbar />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
