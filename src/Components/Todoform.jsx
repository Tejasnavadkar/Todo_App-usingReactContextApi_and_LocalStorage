import React, { useState } from 'react'
import { useTodo } from '../Context/TodoContext';

function TodoForm() {

 const [todo,setTodo] = useState("") // ye state individual todoform ke lye jo type kiya hua tudo store bhi to karana padega na

 const {addTodo} = useTodo() // yaha pe context me se addTodo() retrive kiya yahape use karanr ke liye hamane custom hook banyatha usme context tha isiliye direct hook use kiya retrive ke liye

 const add = (e) =>{
  e.preventDefault()
  if(!todo) return  // agar todo na ho to return means get out from function

  // addTodo(todo) yese directly todo pass nahi kar sakate kyoki hamane already sturcture define kiya hai app.jsx me 

  // addTodo ({id:Date.now(),todo:todo,completed:false}) but ye define kiya hai to as it yahape likhane ki jarurat nahi hai 

  addTodo({todo,completed:false})
  setTodo("") //ek bar todo set hua to empty kardo matlab field bhi clear ho jaye
 }
    

    return (
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)} //jobhi type kiya vo set karo state me
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

