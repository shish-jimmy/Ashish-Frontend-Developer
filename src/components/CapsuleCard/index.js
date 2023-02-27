import React, { useState } from "react";
import styles from "./index.module.css";
import  closeButton  from "../../assets/closeButton.jpg";

const CapsuleCard = ({ capsule }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (<>
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{capsule.capsule_serial}</h5>
        <h6 className={styles.cardSubtitle}>{capsule.capsule_id}</h6>
        {/* <p className={styles.cardText}>{capsule.details}</p> */}
        <button className={styles.button} onClick={handleShow}>
          More Info
        </button>
      </div>
      </div>
    {/* <div className={styles.cardContainer}> */}
      
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeButton} onClick={handleClose}>
              <img src={closeButton} alt="closeButton"/>
            </button>
            <h2>{capsule.capsule_id}</h2>
            <div className={styles.modalContent}>
              <p>Type: {capsule.type}</p>
              <p>Details: {capsule.details}</p>
              <p>Status: {capsule.status}</p>
              <p>Original Launch: {capsule.original_launch}</p>
            </div>
          </div>
        </div>
      )}
    {/* </div> */}
    </>
  );
};

export default CapsuleCard;

// index.module.css

