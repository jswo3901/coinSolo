import React, { Component } from 'react';
import axios from 'axios';

// 리스팅 컴포넌트
const HomeAtomContentList = ({ contentList, id, selectContent }) => {
  // 삭제 api
  const clickDelete = () => {
    axios.delete('/api/atom/' + id)
  }
  const clickSelect = () => {
    const item = { id: id, contents: contentList }
    selectContent(item)
  }
  return (
    <div>
      <li>{contentList}</li>
      <button onClick={clickDelete}>삭제</button>
      <button onClick={clickSelect}>선택</button>
    </div>
  );
};

// CREATE 컴포넌트
const HomeAtomCreate = ({ contents, handleChange, handleSubmit }) => {
  // 인풋값 변경
  const onChange = (e) => {
    handleChange(e.target.value)
  }
  // 제출
  const onSubmit = (e) => {
    handleSubmit(e)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="contents" value={contents} onChange={onChange}/><button type="submit">입력</button>
      </form>
    </div>
  );
};

// 수정 컴포넌트
const HomeAtomUpdate = ({updateContents, changeUpdateContents, handleUpdate, id}) => {
  const onChange = (e) => {
    changeUpdateContents(e.target.value)
  }
  const onSubmit = (e) => {
    handleUpdate(e)
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
      대상 id : {id}
      <br />
      <input type="text" name="updateContents" value={updateContents} onChange={onChange} />
      <button>수정</button>
      </form>
    </div>
  );
};

// 최종 렌더
class HomeAtom extends Component {
  constructor() {
    super();
    this.state = {
      // 입력 - contents, 수정 - updateContents, json - contentsList
      contents: '',
      updateContents: {
        contents: '',
        id:''
      },
      contentsList: []
    }
  }

  // READ API
  getContents = () => {
    axios.get('/api/atom')
      .then((response) => {
        this.setState({
          contentsList: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // 새로고침 시 함수 호출
  componentDidMount() {
    this.getContents();
  }

  // CREATE
  // 인풋값 state에 적용
  handleChange = (newContents) => {
    this.setState({
      contents: newContents
    })
  }
  // CREATE api 호출
  handleSubmit = (e) => {
    e.preventDefault();
    const { contents } = this.state
    axios.post('/api/atom',
      {
        contents: contents
      })
  }

  // UPDATE
  // 수정 대상 전달
  selectContent = (item) => {
    this.setState({
      updateContents: item
    })
  }
  // 수정값 state 적용
  changeUpdateContents = (newUpdateContents) => {
    this.setState({
      updateContents: {
        ...this.state.updateContents,
        contents: newUpdateContents
      }
    })
  }
  // 수정 api 호출s
  handleUpdate = (e) => {
    const { updateContents } = this.state
    const id = updateContents.id
    e.preventDefault();
    axios.put('/api/atom/'+id, { updateContents: updateContents.contents})
  }

  render() {
    const { updateContents, contents, contentsList } = this.state;
    const { handleChange, handleSubmit, selectContent, changeUpdateContents, handleUpdate } = this
    return (
      <div>
        입력창
        <HomeAtomCreate
          handleChange = {handleChange}
          handleSubmit = {handleSubmit}
          contents = {contents}
        />
        <hr />
        수정창
        <HomeAtomUpdate
          id = {updateContents.id}
          updateContents = {updateContents.contents}
          changeUpdateContents = {changeUpdateContents}
          handleUpdate = {handleUpdate}
        />
        <ul>
          {contentsList.map((contentsList, i) => {
            return (
              <HomeAtomContentList
              selectContent={selectContent}
              contentList={contentsList.contents}
              key={i}
              id={contentsList._id}
              />);
          })}
        </ul>
      </div>
    );
  }
}

export default HomeAtom;