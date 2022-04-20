import React,{ useState, useCallback, useEffect } from 'react';
import './App.css';
import MyHeader from './components/Header'
import AddInput from './components/AddInput'
import TodoItem from './components/TodoItem'
import CheckModal from './components/Modal/CheckModal'
import EditModal from './components/Modal/EditModal';
import NoDataTip from './components/NoDataTip';
import { fromJS } from 'immutable';
function App() {
  const [isInputShow, setShow] = useState(false),
        [isShowCheckModal, setShowCheckModal] = useState(false),
        [todoList, setTodoList] = useState([]),
        [currentData, setCurrentData] = useState(fromJS({})),
        [isShowEditModal, setShowEditModal] = useState(false);

  useEffect(()=>{
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]')
    setTodoList(todoData);
  },[])
  
  useEffect(()=>{
    localStorage.setItem('todoData', JSON.stringify(todoList));
  },[todoList])

  const addItem = useCallback((value)=>{
    const dataItem = {
      id:new Date().getTime(),
      content: value,
      completed: false
    };

    setTodoList((todoList)=>[...todoList,dataItem]);
    setShow(false);
  },[]);

  const openCheckModal = useCallback((id) => {
    _setCurrentData(todoList, id)
    setShowCheckModal(true)
  },[todoList])

  const openEditModal = useCallback((id) => {
    _setCurrentData(todoList, id)
    setShowEditModal(true)
  },[todoList])

  function _setCurrentData (todoList, id) {
    setCurrentData(() => todoList.filter(item=>item.id===id)[0])
  }

  const submitEdit = useCallback((newData, id)=>{
    setTodoList((todoList) => {
      let newTodoList = todoList.map((item)=>{
        if(item.id === id) {
          item = newData;
        }
        return item;
      })
      setShowEditModal(false);
      return newTodoList;
    })
  }, [])

  const completeItem = useCallback((id) => {
    setTodoList((todoList) => {
      let newTodoList = todoList.map((item)=>{
        if(item.id === id) {
          item.completed = !item.completed
        }
        return item;
      })
      return newTodoList;
    })
  },[])

  const removeItem = useCallback((id)=>{
    setTodoList((todoList)=>
      todoList.filter(item=>{
        if(item.id!==id) {
          return item;
        }
      })
    );
  },[])

  return (
    <div className='App'>
      <CheckModal 
        isShowCheckModal = {isShowCheckModal}
        closeModal = {()=>{setShowCheckModal(false)}}
        data = {currentData}
      />
      <EditModal 
        isShowEditModal = {isShowEditModal}
        data = {currentData}
        submitEdit = {submitEdit}
      />
      <MyHeader openInput={()=>{setShow(!isInputShow)}}/>
      <AddInput 
        isInputShow={ isInputShow }
        addItem={(value)=>{
          addItem(value);
        }}
      />

      {
        !todoList || todoList.length === 0
        ?
        (<NoDataTip/>)
        :
        (
          <ul className='todo-list'>
          {
            todoList.map((item,index)=>
              <TodoItem 
                data={item} 
                key={index} 
                openCheckModal={openCheckModal} 
                openEditModal={openEditModal} 
                completeItem={completeItem}
                removeItem={removeItem}
              />
            )
          }
          </ul>
        )
      }
    </div>
  );
}

export default App;
