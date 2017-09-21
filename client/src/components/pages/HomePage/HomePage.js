import React from 'react';
import style from './style.css'
import {Create} from 'components'

const HomePage = () => {
  return (
    <div>
      <div className={style.firstDiv}><Create /></div>
      <div className={style.secondDiv}></div>
      <div className={style.thirdDiv}></div>
    </div>
  )
};

export default HomePage;