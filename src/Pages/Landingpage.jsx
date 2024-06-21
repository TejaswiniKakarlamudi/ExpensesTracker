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
      
      <Display/>
    </div>
  );
}

export default LandingPage;
