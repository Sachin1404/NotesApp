import {createContext} from "react"
export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    AddTodo: (todoobj) => {},
    UpdateTodo: (todoobj) => {},
    DeleteTodo: (id) => {},
    CompleteTodo: (id) => {}
})

export const TodoProvider = TodoContext.Provider