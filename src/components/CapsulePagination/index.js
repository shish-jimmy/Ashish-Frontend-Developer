import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../store/capsules/actions';
import styles from "./index.module.css"

const CapsuleGridPagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.capsules.currentPage);
  const itemsPerPage = useSelector((state) => state.capsules.itemsPerPage);
  const capsules = useSelector((state) => state.capsules.capsules);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(capsules.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    dispatch(setCurrentPage(pageNumber));
  };

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (currentPage < pageNumbers.length) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <ul className={styles.pagination}>
        <li className={styles.pagination__item}>
          <button  onClick={handlePrevClick} className={styles.pagination__link}>
            Prev
          </button>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={styles.pagination__item}>
            <button
 
  className={` ${currentPage === pageNumber ? styles.pagination__linkActive : styles.pagination__link}`}
  onClick={(event) => handleClick(event, pageNumber)}
>
  {pageNumber}
</button>

          </li>
        ))}
        <li className={styles.pagination__item}>
          <button  onClick={handleNextClick} className={styles.pagination__link}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CapsuleGridPagination;
