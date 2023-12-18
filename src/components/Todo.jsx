import React,{ useState,useEffect } from 'react'
import { collection,getDocs,addDoc,doc,deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../sass/todo.scss';
import {FaClipboardList} from 'react-icons/fa';


function Todo() {
      const [todo , setTodo] = useState('');
      const [datatodos,setDatatodos] = useState([]);
      const [stateDel,setStateDel]= useState(false);
      const [reporttext,setReportText] = useState('');

      const addTodo = async (e)=>{
        e.preventDefault();
       try {
        const doc = await addDoc(collection(db,'todos'),{
          data:todo
        })
        setReportText('Add Todo Success !!');
        setStateDel(true);
        setTimeout(()=>{
         setStateDel(false);
        },3000)
       
        console.log(doc.id)
       } catch(err) {
        alert(err)
       }
      }

      const fetchTodos = ()=>{
        getDocs(collection(db,'todos'))
        .then((res)=>{
          const newData = res.docs.map((e)=>[e.data().data,e.id]);
          setDatatodos(newData);
          console.log(newData);
        })
      }

      useEffect(()=>{
        fetchTodos();
      },[])
      

      const deleteTodo = (e)=>{
        deleteDoc(doc(collection(db,'todos'),e.target.id))
        .then(()=>{
          setReportText('Delete This todo !');
          setStateDel(true);
        setTimeout(()=>{
         setStateDel(false);
        },3000)
        }).catch((err)=>alert(err.message))       
      }

      return (
    <section className="Todo-box my-4">
      <form className="w-50 mx-auto">
        <h2 className="fw-light text-center">What do you do to day <FaClipboardList/></h2>
        <div className="form-group d-flex justify-content-center">
        <input 
        type="text"
        placeholder="What do you do to day??"
        className='form-control my-3 w-50'
        onChange={(e)=>setTodo(e.target.value)}></input>
       <div className="button-box">
       <button 
        className="btn btn-primary my-3 rounded-0 rounded-end" 
        type="submit"
        onClick={addTodo}>Submit</button>
       </div>
        </div>
      </form>
      {/* Display Todos */}
      <div className="display-todos w-50 mx-auto">
       {datatodos?.map((e,i)=>(
         <div key={i} className="todo-items my-2 mx-auto d-flex">
          <p className="h-100 w-100 p-2 my-1 rounded-start" style={{background: '#e0e0e0'}}>{e[0]}</p>
          <button id={e[1]} onClick={deleteTodo} className="btn btn-danger h-100 my-1 rounded-0 rounded-end">Delete</button>
         </div>
       ))}

       <div className="px-4" id={stateDel ? 'report-delete-display':'report-delete-none'}>
         <p>{reporttext}</p>
       </div>
      </div>
    </section>
  )
}

export default Todo