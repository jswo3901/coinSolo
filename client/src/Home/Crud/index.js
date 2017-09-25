import React, { Component } from 'react';
import { Create, Update, List } from './path'
// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudActions from './controller'
import { fromJS } from 'immutable'
// axios
import axios from 'axios'
import api from 'api'

class Crud extends Component {
  // LIST LOAD
  componentDidMount() {
    this.handleRead()
  }
  
  // CREATE - input
  handleChange = (newContent) => {
    const { crudActions } = this.props
    crudActions.input({newContent})
  }
  // CREATE - api
  handleSubmit = () => {
    const { content } = this.props
    axios.post(api.crud, { content: content })
    this.handleRead()
  }
  
  // READ
  handleRead = () => {
    const { crudActions } = this.props
    axios.get(api.crud)
    .then((response) => {
      const newInfo = fromJS(response.data)
      crudActions.read({newInfo})
    })
  }

  // DELETE
  handleDelete = (id) => {
    axios.delete(api.crud + id)
    this.handleRead()
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
    axios.put(api.crud+id, { content: selectObject.content})
    this.handleRead()
  }

  render() {
    const { content, contentInfo, selectInfo } = this.props
    const contentObject = contentInfo.toJS()
    const selectObject = selectInfo.toJS()
    const { 
      handleChange, handleSubmit, 
      handleSelect,
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
    content: state.crud.get('content'),
    contentInfo: state.crud.get('contentInfo'),
    selectInfo: state.crud.get('selectInfo')
  }),

  (dispatch) => ({
    crudActions: bindActionCreators(crudActions, dispatch)
  })

)(Crud);