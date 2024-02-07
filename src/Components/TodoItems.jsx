import React, { useState } from 'react'
import { useTodo } from '../Context';

function TodoItem({ todo }) { // yaha pe {todo} each item hai
  const [isTodoEditable, setIsTodoEditable] = useState(false) //to check todo editable hai ya nahi bydefault editable nahi hota
  const[todoMsg,setTodoMsg] = useState(todo.todo) // editable hai to msg bhi to set karana padega
  const {updatedTodo,deleteTodo,toggleCompleted} = useTodo()

  const editTodo =() =>{
    updatedTodo(todo.id,{...todo,todo:todoMsg})  //sirf todo ka msg change karo
    setIsTodoEditable(false)  // then false set kardo
  }

  const toggleComplete = () =>{
    toggleCompleted(todo.id)
  }
    

  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.complete ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleComplete}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable}
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default TodoItem;
