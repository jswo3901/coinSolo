import React, { Component } from 'react';
import { Create, Update, List } from './path'
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeCuteActions from './controller'
import { fromJS } from 'immutable'
// axios
import axios from 'axios'

class HomeCute extends Component {

  // CREATE - input
  handleChange = (newContent) => {
    const { homeCuteActions } = this.props
    homeCuteActions.input({newContent})
  }
  // CREATE - api
  handleSubmit = () => {
    const { content } = this.props
    axios.post('/api/cute', { content: content })
  }
  
  // READ
  handleRead = () => {
    const { homeCuteActions } = this.props
    axios.get('/api/cute')
    .then((response) => {
      const newInfo = fromJS(response.data)
      homeCuteActions.read({newInfo})
    })
  }

  // DELETE
  handleDelete = (id) => {
    axios.delete('/api/cute/' + id)
  }

  // PUT - 선택
  handleSelect = (itemObject) => {
    const { homeCuteActions } = this.props
    const { id, content } = itemObject
    homeCuteActions.select( {newId:id, newContent:content} )
  }

  // PUT - input
  handleChangeSelect = (newContent) => {
    const { homeCuteActions } = this.props
    homeCuteActions.selectInput({newContent})
  }

  // PUT
  handleUpdate = (e) => {
    e.preventDefault()
    const { selectInfo } = this.props
    const selectObject = selectInfo.toJS()
    const id = selectObject.id
    axios.put('/api/cute/'+id, { content: selectObject.content})
  }

  render() {
    const { content, contentInfo, selectInfo } = this.props
    const contentObject = contentInfo.toJS()
    const selectObject = selectInfo.toJS()
    const { 
      handleChange, handleSubmit, 
      handleRead, handleSelect,
      handleDelete,
      handleChangeSelect, handleUpdate
    } = this
    return (
      <div>
        <Create
          content={content}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        
        <Update
          handleUpdate={handleUpdate}
          selectId={selectObject.id}
          selectContent={selectObject.content}
          handleChangeSelect={handleChangeSelect}
        />
        
        <button onClick={handleRead}>새로고침</button>
        
        <ul>
        {contentObject.map((contentObject, i) => {
            return (
              <List
                handleSelect={handleSelect}
                handleDelete={handleDelete}
                content={contentObject.content}
                id={contentObject._id}
                key={i}
              />
            );
        })}
        </ul>
      </div>
    );
  }
}

export default connect(

  (state) => ({
    content: state.homeCute.get('content'),
    contentInfo: state.homeCute.get('contentInfo'),
    selectInfo: state.homeCute.get('selectInfo')
  }),

  (dispatch) => ({
    homeCuteActions: bindActionCreators(homeCuteActions, dispatch)
  })

)(HomeCute);


// class HomeCute extends Component {

//   handleSubmit = (e) => {
//     e.preventDefault();
//     const { cuteValue } = this.props;
//     axios.post('/api/cute', 
//       {
//         cuteValue: cuteValue
//       })
//   }
//   handleChange = (e) => {
//     const { homeActions } = this.props
//     const cuteValue = e.target.value
//     homeActions.change({cuteValue})
//   }

//   render() {
//     const {handleChange, handleSubmit} = this
//     const {cuteValue} = this.props

//     return (
//       <div>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="contents" value={cuteValue} onChange={handleChange} /><button type="submit">submit</button>
//         </form>
//       </div>
//     );
//   }
// }

