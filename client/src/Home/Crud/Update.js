import React from 'react';

const Update = ({ selectId, selectContent, handleChangeSelect, handleUpdate }) => {
  // 폼
  const onChange = (e) => {
    handleChangeSelect(e.target.value)
  }
  // 수정
  const onSubmit = (e) => {
    handleUpdate(e)
  }
  return (
    <div>
      <b>수정</b>
      <br />
      ID 조회 : {selectId}
      <br />
      <form onSubmit={onSubmit}>
      <input name="content" value={selectContent} onChange={onChange}/>
      <button type="submit">수정</button>
      </form>
      <hr />
    </div>
  );
};

export default Update;