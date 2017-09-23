import React, { Component } from 'react';
import axios from 'axios';

const HomeAtomContentList = ({ loadData }) => {
  return (
      <li>{loadData}</li>
  );
};

class HomeAtom extends Component {
  constructor() {
    super();
    this.state = {
      contents: '',
      dbContents: []
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getContents = () => {
    axios.get('/api/atom')
      .then((response) => {
        this.setState({
          dbContents: response.data
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
    const { contents, dbContents } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="contents" value={contents} onChange={this.onChange} /><button type="submit">submit</button>
        </form>
        <ul>
          {dbContents.map((dbContent, i) => {
            return (<HomeAtomContentList 
              loadData={dbContent.contents}
              key={i} />);
          })}
        </ul>
      </div>
    );
  }
}

export default HomeAtom;