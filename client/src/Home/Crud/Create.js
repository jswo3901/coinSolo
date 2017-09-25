import React from 'react';

const Create = ({ content, handleChange, handleSubmit }) => {

  // CREATE - input
  const onChange = (e) => {
    handleChange(e.target.value)
  }

  // API
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit()
  }

  return (
    <div>
      <b>입력</b>
      <br />
      <form onSubmit={onSubmit}>
      <input name="content" value={content} onChange={onChange} />
      <button>입력</button>
      </form>
      <hr />
    </div>
  );
};

export default Create;