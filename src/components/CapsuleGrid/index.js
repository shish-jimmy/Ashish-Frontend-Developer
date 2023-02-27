import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Capsule from "../CapsuleCard";
import CapsuleGridSearch from "../SearchForm";
import { fetchCapsules } from "../../store/capsules/actions";
import { setSearchParams, setCurrentPage } from "../../store/capsules/actions";
import CapsuleGridPagination from "../CapsulePagination";
import styles from "./index.module.css";
import rocket from '../../assets/rocket.png'


const CapsuleGrid = () => {
  const capsules = useSelector((state) => state.capsules.capsules);
  const searchParams = useSelector((state) => state.capsules.searchParams);
  const currentPage = useSelector((state) => state.capsules.currentPage);
  const itemsPerPage = useSelector((state) => state.capsules.itemsPerPage);
  const dispatch = useDispatch();

  const [displayCapsules, setDisplayCapsules] = useState(capsules);
  const [showNoResults, setShowNoResults] = useState(false);


  const memoizedFilteredCapsules = useMemo(() => {
    return capsules.filter((capsule) => {
      if (
        searchParams.status &&
        !capsule.status.toLowerCase().includes(searchParams.status.toLowerCase())
      ) {
        return false;
      }
      if (
        searchParams.type &&
        !capsule.type.toLowerCase().includes(searchParams.type.toLowerCase())
      ) {
        return false;
      }
      if (
        searchParams.originalLaunch &&
        (capsule.original_launch === null ||
          !capsule.original_launch
            .toLowerCase()
            .includes(searchParams.originalLaunch.toLowerCase()))
      ) {
        return false;
      }
      return true;
    });
  }, [capsules, searchParams]);

  useEffect(() => {
    dispatch(fetchCapsules());
  }, [dispatch]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginated = memoizedFilteredCapsules.slice(startIndex, endIndex);
    setDisplayCapsules(paginated);
    setShowNoResults(paginated.length === 0);
  }, [memoizedFilteredCapsules, currentPage, itemsPerPage]);

  const handleSearchParamsChange = (params) => {
    dispatch(setSearchParams(params));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(setSearchParams({ ...searchParams, query: "" }));
  };

  return (
    <div style={{ height: "100vh" }}>
       <div className={styles.bannerContainer}>
      <div className={styles.textGrid}>
        <h1>Welcome to the Capsule Collection</h1>
        <p>Discover SpaceX's historic spacecrafts and missions</p>
        {/* <button>View all Capsules</button> */}
      </div>
      <div className={styles.imageGrid}>
        <img src={rocket} alt="rocketImage" className={styles.ImageJaipur} />
      </div>
    </div>
      <div className={styles.mainContainer}>
        <div className={styles.searchContainer}>
<CapsuleGridSearch onSearchParamsChange={handleSearchParamsChange} />
</div>
<div className={styles.cardsGridMainContainer}>
{showNoResults ? (
<div className={styles.nothingPop}>

Oops ,Nothing to see here
</div>
) : (
<div className={styles.grid} role="article">
{displayCapsules.map((capsule) => (
<Capsule key={capsule.capsule_serial} capsule={capsule} />
))}
</div>
)}
</div>
<div className={styles.pagination} >
<CapsuleGridPagination onPageChange={handlePageChange} />
{((currentPage + 1) * itemsPerPage) <= memoizedFilteredCapsules.length &&
!showNoResults &&
displayCapsules.length === 0 && (
<div className={styles.nothingPop}>

Oops ,Nothing to see here
</div>
)}
</div>
</div>
</div>
);
};

export default CapsuleGrid;
