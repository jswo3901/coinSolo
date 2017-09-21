import React, { Component } from 'react';
import axios from 'axios';

class Atom extends Component {
  constructor() {
    super();
    this.state = {
      nameInput:''  
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
    
    const { nameInput } = this.state;

    axios.post('/api/atom', 
      {
        nameInput: nameInput
      })
    }
  
  render() {
    const { nameInput } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="nameInput" value={nameInput} onChange={this.onChange} /><button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

export default Atom;