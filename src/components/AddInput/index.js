import React, { useRef } from 'react'
import './index.scss'
export default function AddInput(props) {

  const { isInputShow, addItem } = props;
  const inputRef = useRef();
  const submitValue = () => {
    let inputValue = inputRef.current.value.trim();
    if (inputValue.length === 0) {
      return;
    }
    addItem(inputValue);
  }

  return (
    <div>
      {
        isInputShow && 
        <div className='input-wrapper'>
          <input 
            type="text"
            placeholder='请输入待办事件'
            ref={inputRef}
          />
          <button 
            className='btn btn-primary'
            onClick={ submitValue }
          >
            增加
          </button>
        </div>
      }
    </div>
  )
}
