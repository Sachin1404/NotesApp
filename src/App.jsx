import  { useEffect, useState } from "react";
import {TodoProvider} from "./Context/TodoContext.js";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
function App() {
  const [todos,setTodos]=useState([])
  const AddTodo=(todoobj)=>{
    setTodos((prev)=>[{id:Date.now(),...todoobj},...prev])
  }
  const UpdateTodo=(todoobj)=>{
    setTodos((prev)=>prev.map((prevtodo)=>{
      if(prevtodo.id===todoobj.id) return todoobj
      else return prevtodo
    }))
  }
  const DeleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((prevtodo)=>{
      return prevtodo.id!=id
    }))
  }

  const CompleteTodo=(id)=>{
    setTodos((prev)=>prev.map((prevtodo)=>{
      if(prevtodo.id===id){
        return {...prevtodo,completed:!prevtodo.completed}
      }
      else{
        return prevtodo
      }
    }))
  }
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))
    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos,AddTodo,UpdateTodo,DeleteTodo,CompleteTodo}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-4xl font-bold text-center mb-8 mt-2">I will remember for you</h1>
                    <div className="mb-4">
                        <TodoForm/> 
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                    {todos.map((todoobj) => (
                          <div key={todoobj.id}
                          className='w-full'
                          >
                            <TodoItem todoobj={todoobj} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App