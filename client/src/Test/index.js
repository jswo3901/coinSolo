import React, { Component } from 'react';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      spend: ''
    };
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  onSubmit(e){
    e.preventDefault()
    this.setState({
      spend:this.state.name
    })
  }

  onChange(e){
    this.setState({
      name:e.target.value
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input name="name" onChange={this.onChange} value={this.state.name}></input>
          <button type="submit">보내기</button>
        </form>
      </div>
    );
  }
}

export default Test;