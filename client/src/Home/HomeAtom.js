import React, { Component } from 'react';
import axios from 'axios';

class HomeAtom extends Component {
  constructor() {
    super();
    this.state = {
      contents:''  
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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
    const { contents } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="contents" value={contents} onChange={this.onChange} /><button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default HomeAtom;