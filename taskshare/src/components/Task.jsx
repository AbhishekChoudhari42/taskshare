/* eslint-disable react/prop-types */
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux"
import {TiDelete} from 'react-icons/ti'
import {addTask,removeTask} from '../redux_toolkit/features/tableSlice'
const Task = ({task}) => {

  const [dragging,setDragging] = React.useState(false);
  const [index,setIndex] = React.useState({start:null,end:null});
  
  const dispatch = useDispatch()


  
  const notify = () =>{
    toast.warn("Task deleted")
  }

  const handleDrag = (e) =>{
    setIndex({...index,end:Math.floor(e.clientX/300)})
    setDragging(true)
  }

  const handleDragStart = (e) =>{
    setIndex({...index,start:Math.floor(e.clientX/300)})
  }

  const handleDragEnd = (e,task) =>{
    
    dispatch(removeTask({id:task.id,index:index.start}))
    dispatch(addTask({task:task,index:index.end}))
    
    setDragging(false)
    setIndex({start:null,end:null})
  }

  const deleteTask = (e,taskID) =>{
    let index = Math.floor(e.clientX/300)
    dispatch(removeTask({id:taskID,index:index}))
    notify()
  }

  return (
  
    <div id={task.id} onDrag={handleDrag} onDragEnd={(e)=>handleDragEnd(e,task)} onDragStart={handleDragStart}  draggable 
          className={`flex justify-between items-top p-2 border-2 border-neutral-900 mt-2 rounded-md  ${dragging?'opacity-40':''}`}>
            
             <p className="text-neutral-200 text-sm max-h-[300px] overflow-y-scroll  max-w-[90%]">{task.desc}</p>
             <TiDelete size={18} className='text-white hover:text-red-600 cursor-pointer' onClick={(e)=>{deleteTask(e,task.id)}}/>
    </div>
  )
}

export default Task