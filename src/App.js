
import React, {useState, useEffect} from "react";
import {db } from './firebase'
import { query, collection, onSnapshot, QuerySnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import {AiOutlinePlus} from "react-icons/ai";
import Todo from "./Todo";

const style = {
  bg: `h-screen w-screen p-4 bg-[url('../layered-waves-haikei.svg')] bg-no-repeat bg-cover`,
  container: `bg-dirt max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mt-10` ,
  heading: `text-3xl font-bold text-center text-tan p-2 text-white`,
  form: `flex justify-between p-2`,
  input: `border p-2 w-full text-xl  p-2`,
  button: `border p-4 ml-2 bg-tan`,
  count: `text-center p-2`,
};

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('')

  //create todo
  const createTodo = async (e) => {
     e.preventDefault(e);
     if(input === "") {
      alert("Please a todo!")
      return
     }
     await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false
     })
     setInput("");
  }

  //read todo from firebase
  useEffect(() => {
     const q = query(collection(db, 'todos'))

     const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArray = [];
      QuerySnapshot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id})
      })
      setTodos(todosArray);
     })
     return () => unsubscribe;
  }, [])

  // update todo firebase
  const toggleComplete = async (todo) => {
     await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
     })
  }

  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  }

  return (
    
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>
          Today's Todos
        </h3>
        <form className={style.form} onSubmit={createTodo}>
          <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Add Todo" className={style.input}/>
          <button className={style.button} > 
            <AiOutlinePlus size={30}/>
          </button>
        </form>


      <ul className=" flex flex-col w-full max-w-[500px]">
        {todos.map((todo, idx) => (
           <Todo key={idx} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        ))}
        
      </ul>

          {todos.length < 1 
            ? "" 
            : <p className="m-auto text-center font-bold text-tan mt-11"> {`You have ${todos.length} todos left`} </p>
          }
          

      </div>
    </div>
  );
}

export default App;
