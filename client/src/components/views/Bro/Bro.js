import React from 'react';
import style from './style.css'
import PropTypes from 'prop-types';

import * as actions from './actions';
import { connect } from 'react-redux';

import { getRandomColor } from './lib/utils';

// 컴포넌트 파트
export function Bro ({number, color, onDecrement, onIncrement, onSetColor}) {
  return (
    <div>
      <div
        style={{backgroundColor: color}}
        className={style.BroDiv}
        onClick={onIncrement}
        onContextMenu={
          (e) => { 
            e.preventDefault(); 
            onDecrement();
            }
          }
        onDoubleClick={onSetColor}
      >
        {number}
      </div>
    </div>
  );
};

Bro.propTypes = {
  number: PropTypes.number,
  color: PropTypes.string,
  onIncrement: PropTypes.func,
  onDecrement: PropTypes.func,
  onSetColor: PropTypes.func
};

Bro.defaultProps = {
  number: 0,
  color: 'black',
  onIncrement: () => console.warn('onIncrement not defined'),
  onDecrement: () => console.warn('onDecrement not defined'),
  onSetColor: () => console.warn('onSetColor not defined')
};


// 컨테이너 파트
const mapStateToProps = (state) => ({
  color: state.color,
  number: state.number
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch(actions.increment()),
  onDecrement: () => dispatch(actions.decrement()),
  onSetColor: () => {
    const color = getRandomColor();
    dispatch(actions.setColor(color));
}
});

// 컴포넌트를 어플리케이션의 데이터레이어와 결합
export default connect(mapStateToProps, mapDispatchToProps)(Bro);