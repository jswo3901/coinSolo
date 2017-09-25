import React from 'react';

const List = ({ content, handleDelete, handleSelect, id }) => {
  // DELETE 버튼
  const onDelete = () => {
    handleDelete(id)
  }
  // 선택 버튼
  const onSelect = () => {
    const itemObject = { id: id, content: content }
    handleSelect(itemObject)
  }
  return (
    <div>
      <li>{content}</li>
      <button onClick={onDelete}>삭제</button>
      <button onClick={onSelect}>선택</button>
    </div>
  );
};

export default List;