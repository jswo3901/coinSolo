import React from 'react';
import style from './style.css'
import {Atom, Bro} from 'components'

const HomePage = () => {
  return (
    <div>
      <div className={style.firstDiv}><Atom /></div>
      <div className={style.secondDiv}><Bro /></div>
      <div className={style.thirdDiv}></div>
    </div>
  )
};

export default HomePage;