import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

// 액션타입 정의 - 파라미터 주석
const INCREMENT = 'atomBro/INCREMENT';
const DECREMENT = 'atomBro/DECREMENT';
const SET_COLOR = 'atomBro/SET_COLOR'; // color

// 액션 생성자
export const increment = createAction(INCREMENT); // 
export const decrement = createAction(DECREMENT); // 
export const set_color = createAction(SET_COLOR); // color

const initialState = Map({
  number: 0,
  color:'yellow'
})

export default handleActions({
  [INCREMENT]: (state, action) => {
    return state.set('number', state.get('number')+1)
  },
  [DECREMENT]: (state, action) => {
    return state.set('number', state.get('number')-1)
  },
  [SET_COLOR]: (state, action) => {
    return state.set('color', action.payload.color)
  },
}, initialState);