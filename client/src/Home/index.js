import React from 'react';
import styles from './styles.css'
import { Chat, Room, Crud, SignUp } from './path'

const Home = () => {
  return (
    <div>
      <div className={styles.atomDiv}>
        <Chat />
      </div>
      <div className={styles.broDiv}>
        <Room />
      </div>
      <div className={styles.crudDiv}>
        <Crud />
      </div>
      <div>
        <SignUp />
      </div>
    </div>
  )
};

export default Home