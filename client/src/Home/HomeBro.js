import React, {Component} from 'react';
import styles from './styles.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeBroActions from './HomeBro.controller'
import { getRandomColor } from 'lib';

// props 상속 설정
const HomeBroCircle = ({ color, number, onIncrement, onDecrement, onSetcolor}) => {
  let style = {
    backgroundColor: color
  }
  return (
    <div
      className={styles.homeBroCircle}
      style={style}
      onClick={onIncrement}
      onContextMenu={
        (e) => { 
        e.preventDefault();
        onDecrement()
        }
      }
      onDoubleClick={onSetcolor}
    >
    {number}
    </div>
  );
};

// 렌더(컨테이너로 감싼다)
class HomeBro extends Component {
  handleIncrement = () => {
    const { HomeBroActions } = this.props
    HomeBroActions.increment()
  }
  handleDecrement = () => {
    const { HomeBroActions } = this.props
    HomeBroActions.decrement()
  }

  handleSetcolor = () => {
    const { HomeBroActions } = this.props
    const color = getRandomColor()
    HomeBroActions.set_color({color})
  }
  
  render() {
    const{
      number,
      color
    } = this.props
    const {
      handleIncrement,
      handleDecrement,
      handleSetcolor
    } = this
    return (
      <div>
        <HomeBroCircle
          number={number}
          color={color}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onSetcolor={handleSetcolor}
        />
      </div>
    );
  }
}

// 컨테이너 파트
export default connect(
// 스테이트 전달
  (state) => ({
  number: state.HomeBroController.get('number'),
  color: state.HomeBroController.get('color'),
  }),
  (dispatch) => ({
      HomeBroActions: bindActionCreators(homeBroActions, dispatch)
  })
)(HomeBro);