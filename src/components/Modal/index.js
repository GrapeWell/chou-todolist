import React from 'react'
import '../../assets/css/common.scss';
export default function Modal(props) {
  const { isShowModal, modalTitle, children } = props
  return (
    <div>
      {
        isShowModal && 
        <div className='modal'>
          <div className='inner'>
            <div className='m-header'>
              {modalTitle}
            </div>
            <div className='content-wrapper'>
              { children }
            </div>
          </div>
        </div>
      }
    </div>
  )
}
