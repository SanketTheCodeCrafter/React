import { createContext, useContext } from "react";

export const ToDoContext=createContext({
    todos:[
        {
            id: 1,
            todo: "ToDo msg",
            isCompleted: false,
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id, updateTodo)=>{},
    deleteTodo:(id)=>{},
    togggleComplete:(id)=>{}
})

export const useToDo=()=>{
    return useContext(ToDoContext)
}

export const ToDoProvider=ToDoContext.Provider