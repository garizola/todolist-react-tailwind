import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'


const Todo = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <li className={
        todo.completed 
            ? "flex justify-between bg-sage/50 p-4 my-2 capitalize" 
            : "flex justify-between bg-purp/70 hover:bg-purp p-4 my-2 capitalize" 
        }>

        <div className="flex">

            <input onChange={() => toggleComplete(todo)} type="checkbox" className="" checked={todo.completed ? 'checked' : ''}/>
            <p onClick={() => toggleComplete(todo)}
            className={
                todo.completed 
                    ? "ml-2 cursor-pointer text-purp/80 line-through font-bold"
                    : "ml-2 cursor-pointer text-white  font-bold"
                }> 
                    {todo.text}
            </p>
            
        </div>


        <button onClick={() => deleteTodo(todo.id)} className="text-white cursor-pointer flex items-center"> {<FaRegTrashAlt />} </button>

        

    </li>
  )
}

export default Todo