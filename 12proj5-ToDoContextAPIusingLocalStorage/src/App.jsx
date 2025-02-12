import { useEffect, useState } from 'react'
import './App.css'
import { ToDoProvider } from './contexts/ToDoContext'
import Todoform from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos]=useState([])

  const addTodo=(todo)=>{
    setTodos((prevTodos)=>[{id: Date.now(), ...todo}, ...prevTodos])
  }

  const updateTodo=(id, updatedTodo)=>{
    setTodos((prevTodos)=>prevTodos.map((todo)=>todo.id===id? updatedTodo: todo))
  }

  const deleteTodo=(id)=>{
    setTodos((prevTodos)=>prevTodos.filter((todo)=> todo.id!==id));
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevtodo)=>prevtodo.id===id? {...prevtodo, completed: !prevtodo.completed}: prevtodo))
  }

  useEffect(()=>{
    const todos=localStorage.getItem("todos")

    if(todos && todos.length>0){
      setTodos(JSON.parse(todos))
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <ToDoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              {/* Todo form goes here */}

              <Todoform />
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}

              {todos.map((todo)=>(
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
              ))}
            </div>
          </div>
        </div>
      </ToDoProvider>
    </>
  )
}

export default App
