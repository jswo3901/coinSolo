import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from './controller'
import axios from 'axios';

class HomeCute extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    const { cuteValue } = this.props;
    axios.post('/api/cute', 
      {
        cuteValue: cuteValue
      })
  }
  handleChange = (e) => {
    const { homeActions } = this.props
    const cuteValue = e.target.value
    homeActions.change({cuteValue})
  }

  render() {
    const {handleChange, handleSubmit} = this
    const {cuteValue} = this.props
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" name="contents" value={cuteValue} onChange={handleChange} /><button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

// 컨테이너 파트
export default connect(
  (state) => ({
    cuteValue: state.homeController.getIn(['homeCute', 'cuteValue']),
  }),

  (dispatch) => ({
    homeActions: bindActionCreators(homeActions, dispatch)
  })
)(HomeCute);