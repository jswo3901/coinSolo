import React from 'react';

const SignUpForm = ({ handleChange, handleSubmit }) => {
    
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
          <form action="/" onSubmit={onSubmit}>
            <b>회원가입</b>
            <br />
            <form onSubmit={onSubmit}>
            <input name="content" value={"content"} onChange={onChange} />
            <input name="content" value={"content"} onChange={onChange} />
            <button>가입하기</button>
            </form>
            <hr />
          </form>
        </div>
      );
    };

export default SignUpForm;