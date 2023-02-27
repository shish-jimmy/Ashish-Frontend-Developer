import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchParams } from "../../store/capsules/actions";
import styles from './index.module.css'

const CapsuleGridSearch = () => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const [originalLaunch, setOriginalLaunch] = useState("");
  const [type, setType] = useState("");

  const handleSearchParams = () => {
    dispatch(
      setSearchParams({
        status: status.trim().toLowerCase(),
        originalLaunch: originalLaunch.trim().toLowerCase(),
        type: type.trim().toLowerCase(),
      })
    );
  };

  return (
    <div className={styles.capsuleGridSearch}>
      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        onKeyUp={handleSearchParams}
      />
      <input
        type="text"
        placeholder="Original Launch"
        value={originalLaunch}
        onChange={(e) => setOriginalLaunch(e.target.value)}
        onKeyUp={handleSearchParams}
      />
      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        onKeyUp={handleSearchParams}
      />
    </div>
  );
};

export default CapsuleGridSearch;
