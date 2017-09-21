import React from 'react';
import styles from './styles.css'
import { HomeAtom, HomeBro, HomeCute } from './path'

const Home = () => {
  return (
    <div>
      <div className={styles.atomDiv}>
        <HomeAtom />
      </div>
      <div className={styles.broDiv}>
        <HomeBro />
      </div>
      <div className={styles.cuteDiv}>
        <HomeCute />
      </div>
    </div>
  )
};

export default Home