import { useState } from 'react';
import './App.css';

function App() {
  const [toDos,setToDos] = useState([])
  const [toDo,setToDo] = useState('')
  const [editingToDo, setEditingToDo] = useState(null)
  const dayofWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Fridayday",
    "Saturday",
  ]
  const today =new Date();
  const dayOfWeek = today.getDay();
  const dayName = dayofWeek[dayOfWeek]

  function addTodo(){
    const Duplicate = toDos.some((obj) => obj.text === toDo);
    if (Duplicate){
      alert("Already exists")
      return;
    }
    if (toDo.trim()){
      setToDos([...toDos, {id: Date.now(), text: toDo.trim(), status: false}])
      setToDo("");
    }else{
      alert("Empty Value")
    }

  }

  function editToDo(toDoId){
    setEditingToDo(toDoId);
    const todoToEdit = toDos.find((todo) => todo.id === toDoId)
    if (todoToEdit){
      setToDo(todoToEdit.text)
    }
  }

  function updateTodo(){
    const updateTodos = toDos.map((todoitem) =>
    todoitem.id === editingToDo ? {...todoitem, text: toDo.trim()}: todoitem)
    setToDos(updateTodos)
    setEditingToDo(null)
    setToDo("")
  }


  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {dayName} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo}
         onChange={(e)=>setToDo(e.target.value)}
         type="text" placeholder="🖊️ Add item..." />
         {editingToDo ? (

         
        <i onClick={updateTodo} className="fas fa-plus"></i>
         ):(
        <i onClick={addTodo} className="fas fa-plus"></i>
        )}
      </div>
      <div className="todos">
        { toDos.map((obj)=>{
        return(  
        <div className="todo" key={obj.id}>
          <div className="left">
            <input onChange={(e)=>{
              console.log(e.target.value);
              console.log(obj);
              setToDos(toDos.filter(obj2=>{
                if(obj2.id === obj.id){
                  obj2.status=e.target.checked
                }
                return obj2
              }))
            }} value={obj.status} type="checkbox" name="" id="" />
            <p>{obj.text}</p>
          </div>
          <div className="right">
            <i onClick={() => editToDo(obj.id)} className="fas fa-pen"></i>
            <i onClick={() => {setToDos(toDos.filter((obj2)=> obj2.id !== obj.id))}} className="fas fa-times"></i>
          </div>
        </div>)})}
          <h4 style={{ color: "greenyellow", marginTop: "20px" }}>Active Status</h4>
        {toDos.map((obj)=>{
          if(obj.status){
            return (
              <div className="input" key={obj.id}>
                <input value={obj.text} type="text" />
              </div>
            );
          }
          return null
        })}
      </div>
    </div>
  );

}

export default App;
