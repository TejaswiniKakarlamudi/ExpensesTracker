import React, { useEffect } from 'react';
import styles from './Landing.module.css';
import Display from '../Components/Display/Display';

function LandingPage() {
  const mainbalance = 5000;

 

  useEffect(() => {
    localStorage.setItem('mainbalance', mainbalance);
  }, [mainbalance]);

  return (
    <div className={styles.lander}>
      <div className={styles.title}>Expense Tracker</div>
      <Display/>
    </div>
  );
}

export default LandingPage;
