import React, { Component } from 'react';
import axios from 'axios';

class HomeAtom extends Component {
  constructor() {
    super();
    this.state = {
      contents:'',
      dbContents:''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  getContents = () => {
    axios.get('/api/atom')
    .then((response) => {
      this.setState({
        dbContents: response.data[0].contents
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
          <li>{dbContents}</li>
        </ul>
      </div>
    );
  }
}

export default HomeAtom;