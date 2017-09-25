// CRUD CONTROLLER
import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

// 액션 타입 정의
const INPUT = 'crud/INPUT' // newContent
const READ = 'crud/READ' // newInfo
const SELECT = 'crud/SELECT' // newId, newContent
const SELECT_INPUT = 'crud/SELECT_INPUT' // newContent

// 액션 생성자
export const input = createAction(INPUT); // newContent
export const read = createAction(READ); // newInfo
export const select = createAction(SELECT); // newId, newContent
export const selectInput = createAction(SELECT_INPUT); // newContent

const initialState = Map({
  content: '',
  selectInfo: Map({
    id: '',
    content: ''
  }),
  contentInfo: List([])
})

export default handleActions({
  [INPUT]: (state, action) => {
    return state.set('content', action.payload.newContent)
  },
  [READ]: (state, action) => {
    return state.set('contentInfo', action.payload.newInfo)
  },
  [SELECT]: (state, action) => {
    return state.setIn(['selectInfo', 'id'], action.payload.newId)
                .setIn(['selectInfo', 'content'], action.payload.newContent)
  },
  [SELECT_INPUT]: (state, action) => {
    return state.setIn(['selectInfo', 'content'], action.payload.newContent)
  }
}, initialState);