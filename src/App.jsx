import { useEffect, useState } from "react"
import TodoForm from "./Components/TodoFrom"
import { TodoData } from "./Components/Context/Context"
import TodoItem from "./Components/Todos"



function App() {
  
const [todo,setTodo]=useState([]);

// addTodo is function which we have defined here. It sets the todo object 
// as we need to get access of previous values too , we used prev and updated the todo with prev value and current value.
const addTodo=(todo)=>{
  setTodo((prev)=>[...prev,{id:Date.now(),...todo}])
}


// updateTodo
// this function updates the previous todo array with new todo array 
// as we know we have a functionalty of updating our todo with a new texts and all
// so to update that we need this function
// here we have applied .map on prev array and if the id matches with the id provided as parameter then update it
const updatedTodo=(id,todo)=>{
setTodo((prev)=>prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo )))
}


//deleteTodo
// in this we will not remove the array element with parameter id
// we will return a new array which doestnt consist of the element which has same id as parameter id
const deleteTodo=(id)=>{
  setTodo((prev)=>prev.filter((todo)=> todo.id!==id))
}

//toggleCompleted
// in this functinality we will actually enter the array and change to check box and toggle it.
// now we will match the parameter id and todo id .If they matches then we need all the value of todo as same but completed as toggled 
// so we use spread operator to the value remain same and which we want to toggle we upadted it . 

const toggleCompleted=(id)=>{
  setTodo((prev)=> prev.map((prevTodo)=>prevTodo.id === id ? {...prevTodo,completed:!prevTodo.completed
  } : prevTodo))
}


useEffect(()=>{
  const todos = JSON.parse(localStorage.getItem("todos"));

  if(todos && todos.length){
    setTodo(todos);
  }
},[])

useEffect(()=>{
  localStorage.setItem("todos",JSON.stringify(todo));
})

// we reterive the functionalty using contex api taht why we have made function in context file
  return (
    <TodoData.Provider value={{TodoData,addTodo,updatedTodo,deleteTodo,toggleCompleted}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3 flex-col">
                       {todo.map((todo)=>{
                           return <TodoItem   key={todo.id} todo={todo} />
                        })}
                    </div>
                </div>
            </div>
    </TodoData.Provider>
  )
}

export default App
