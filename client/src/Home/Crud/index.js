import React, { Component } from 'react';
import { Create, Update, List } from './path'
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudActions from './controller'
import { fromJS } from 'immutable'
// axios
import axios from 'axios'

class Crud extends Component {

  // CREATE - input
  handleChange = (newContent) => {
    const { crudActions } = this.props
    crudActions.input({newContent})
  }
  // CREATE - api
  handleSubmit = () => {
    const { content } = this.props
    axios.post('/api/crud', { content: content })
  }
  
  // READ
  handleRead = () => {
    const { crudActions } = this.props
    axios.get('/api/crud')
    .then((response) => {
      const newInfo = fromJS(response.data)
      crudActions.read({newInfo})
    })
  }

  // DELETE
  handleDelete = (id) => {
    axios.delete('/api/crud/' + id)
  }

  // PUT - 선택
  handleSelect = (itemObject) => {
    const { crudActions } = this.props
    const { id, content } = itemObject
    crudActions.select( {newId:id, newContent:content} )
  }

  // PUT - input
  handleChangeSelect = (newContent) => {
    const { crudActions } = this.props
    crudActions.selectInput({newContent})
  }

  // PUT
  handleUpdate = (e) => {
    e.preventDefault()
    const { selectInfo } = this.props
    const selectObject = selectInfo.toJS()
    const id = selectObject.id
    axios.put('/api/crud/'+id, { content: selectObject.content})
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
    content: state.homeCrud.get('content'),
    contentInfo: state.homeCrud.get('contentInfo'),
    selectInfo: state.homeCrud.get('selectInfo')
  }),

  (dispatch) => ({
    crudActions: bindActionCreators(crudActions, dispatch)
  })

)(Crud);