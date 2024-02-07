import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './Context'
import TodoForm from './Components/Todoform'
import TodoItem from './Components/TodoItems'

function App() {
  const [todos, setTodos] = useState([]) // kyoki todos ko save bhi to karana padega bydefault empty array set karenge 

                                                         // niche jo todo parameter hai wo uperwale state me se nahi aa raha hai uper state mai to sare todos hai[] ye individual todo aa raha hai nichevale form se
  const addTodo = (todo) =>{                             // functionality define karate hai aur parameter vala todo set karenge state ko (upervale)
    setTodos((prev) => [...prev,{id:Date.now(),...todo}])
                                                        // setTodos(todo) agar hum directly set karenge to pichle todo remove ho jayenge (interview wala scenario) to hum callback set karenge jo all preveous value accept kare aur usko spread karo aur uske new todo add karo
     
                                                        // setTodos((prev) => [todo,...prev]) //new wale todo ko pehle rakho but yaha pe direct todo nahi de sakte hai hame todo object ke structutr anusar dena padega
                                                      //...todo bakika tod as it is
  }

  const updatedTodo = (id,todo) =>{
    setTodos((prev) => (prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))) /*prvevous wale sare todo lenge (pur array) uspe map lagayenge each todoobject 
                                                                                            lenge uski id aur parameter vale id se match karenge agar true hai to updated 
                                                                                             todo rakhenge otherwise prev to hi rakhenge*/

  }

  const deleteTodo = (id) => {                                                      // yahappe hum ek naya array banayenge aur jo value delet karani hai sirf wo todoobject nhi lenge aur to hume selctive value leni hai to uske liye filter method use karenge aur naya array banane ke baad use set kaedenge
    setTodos((prev) => prev.filter((todo) => todo.id !== id))  

  }

  const toggleCompleted = (id) =>{                                                                                 //yahape agar id match ki todo ke ander jo hamane completed define kiya tha na uski value reverse kardo agr nahi hai to as it is rakhado  

    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
                                                                                                                          // yaha pe spred ki madat se pehle sari values le aye aur ek property ko override kar diya

  }

  // ab start localStorage functionality

    useEffect(() => {                                            //jab app refresh ho to ho sakata hai ki todos me phle se hi kuch todo ho to use lana bhi to padega and set karana padega to issi liye useefect use kiya kyoki hame function chalana jab page first time mount ho ya refresh ho
       const todos = JSON.parse(localStorage.getItem("todos"))       // yahape hamne pehle get kiya wo string me tha isliya json.parse() value me or object me
       if(todos && todos.length > 0){                            // yaha pe pehle check kiya ki agar todo hai aur agar empty na ho to set karo kypki agar null value set ki to crash ho jayega 
        setTodos(todos)
       }
  },[]) 

  // multiple useffect bhi use kar sakate ho
  
  useEffect(() => {                                         // jab bhi kabhi todos ke andar koi change ho matlab new todo insert ho tabh us todo ko set karo laocal stoarge me

    localStorage.setItem("todos",JSON.stringify(todos)) 

  },[todos])

  // now create components

  return (
    <TodoProvider value={{todos,addTodo,updatedTodo,deleteTodo,toggleCompleted}} >   {/*provider ko kuch provide to karana padega uskeley usko values denge context me se yaha todos property hai aur baki sare methods hai */}
      <div className="bg-[#172842] min-h-screen py-8  rounded-lg">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'> {/*key for uniqness and better optimization*/} 
                            <TodoItem todo={todo}/>   {/*yaha se todo pass hoga todoitem component me */}
                          </div>
                        ))}
                    </div>
                </div>
            </div>
       
    </TodoProvider>
  )
}

export default App
