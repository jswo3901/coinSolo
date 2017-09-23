import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// 액션타입 - HomeBro
const INCREMENT = 'homeBro/INCREMENT';
const DECREMENT = 'homeBro/DECREMENT';
const SET_COLOR = 'homeBro/SET_COLOR'; // color
// 액션타입 - HomeCute
const CHANGE = 'homeCute/CHANGE' // ?

// 액션 생성자 - HomeBro
export const increment = createAction(INCREMENT); // 
export const decrement = createAction(DECREMENT); // 
export const set_color = createAction(SET_COLOR); // cuteValue
// 액션 생성자 - HomeCute
export const change = createAction(CHANGE); // cuteValue

const initialState = Map({
  // 초기state - HomeBro
  homeBro: Map({
    number:0,
    color:'yellow'
  }),
  // 초기state - HomeCute
  homeCute: Map({
    cuteValue: ''
  })
})

export default handleActions({
  // 리듀서 - HomeBro
  [INCREMENT]: (state, action) => {
    return state.setIn(['homeBro', 'number'], state.getIn(['homeBro', 'number'])+1)
  },
  [DECREMENT]: (state, action) => {
    return state.setIn(['homeBro', 'number'], state.getIn(['homeBro', 'number'])-1)
  },
  [SET_COLOR]: (state, action) => {
    return state.setIn(['homeBro', 'color'], action.payload.color)
  },
  // 리듀서 - HomeCute
  [CHANGE]: (state, action) => {
    return state.setIn(['homeCute', 'cuteValue'], action.payload.cuteValue)
  }
}, initialState);