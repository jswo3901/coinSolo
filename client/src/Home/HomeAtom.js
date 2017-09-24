import React, { Component } from 'react';
import axios from 'axios';

const HomeAtomContentList = ({ getContents, contentList, id }) => {
  const clickDelete = () => {
    axios.delete('/api/atom/' + id)
  }
  return (
    <div>
      <li>{contentList}</li><button onClick={clickDelete}>삭제</button>
    </div>
  );
};

class HomeAtom extends Component {
  constructor() {
    super();
    this.state = {
      contents: '',
      contentsList: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

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

  componentDidMount() {
    this.getContents();
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { contents } = this.state;

    axios.post('/api/atom',
      {
        contents: contents
      })
  }

  render() {
    const { contents, contentsList } = this.state;
    const { getContents } = this
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="contents" value={contents} onChange={this.onChange} /><button type="submit">submit</button>
        </form>
        <ul>
          {contentsList.map((contentsList, i) => {
            return (<HomeAtomContentList
              contentList={contentsList.contents}
              id={contentsList._id}
              getContents={getContents}
              key={i} />);
          })}
        </ul>
      </div>
    );
  }
}

export default HomeAtom;