import { createContext,useContext } from "react";   //sabse pehale create context import karo to create context and import usecontext for retrive values from context

export const TodoContext = createContext({  // ab context me functionality define karenge jo wraped components use karenge yaha pe sirf function ko define karenge uski functionality app.jsx me initialize karenge app.jsx uski functionality likhi jati hai

    todos:[
        {                   // todos ke ander humare list hogi iss formate mai and component koi bhi ho mai values to yahi se lunga
            id: 1,
            todo:"Todo msg",  // item ka naam
            completed: false,  // for toggle
        }     
    ],

    addTodo: (todo) =>{},    // insabhi ki functionality hum app.jsx me define karenge
    updatedTodo:(id,todo) => {},
    deleteTodo:(id) => {},
    toggleCompleted:(id) => {}
    
}) 

 export const TodoProvider = TodoContext.Provider  //provider ko bhi yaha pe create kiya aur export kiya

 export const useTodo = () => {
    return useContext(TodoContext) // yaha pe custom hook banaya jo directly yaha se context return kare bar bar usecontext(todoContext) likhane ki jarurat nahi hai directly use useto() hook
 }

