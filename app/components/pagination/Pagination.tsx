import React from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import styles from './Paginatiom.module.css';

interface PaginationProps {
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    totalItem: number;
    perPage: number; 
    showItem: number;
}

const Pagination = ({ pageNumber, setPageNumber, totalItem, perPage, showItem }: PaginationProps) => {
    const totalPage = Math.ceil(totalItem / perPage);
    let startPage = pageNumber - Math.floor(showItem / 2);
    startPage = Math.max(startPage, 1); 
    let endPage = startPage + showItem - 1;

    if (endPage > totalPage) {
        endPage = totalPage;
        startPage = Math.max(totalPage - showItem + 1, 1);
    }

    if (totalPage <= 1) return null; 
    return (
        <ul className={styles.flex} role="navigation" aria-label="Pagination">
            {pageNumber > 1 && (
                <li onClick={() => setPageNumber(pageNumber - 1)} className={styles.pagination} aria-label="Go to previous page">
                    <BsChevronDoubleLeft />
                </li>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                <li key={page} onClick={() => setPageNumber(page)} className={`${styles.pagination} ${pageNumber === page ? styles.active : ''}`}>
                    {page}
                </li>
            ))}
            {pageNumber < totalPage && (
                <li onClick={() => setPageNumber(pageNumber + 1)} className={styles.pagination} aria-label="Go to next page">
                    <BsChevronDoubleRight />
                </li>
            )}
        </ul>
    );
};

export default Pagination;
