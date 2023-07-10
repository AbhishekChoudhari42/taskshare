/* eslint-disable react/prop-types */
import React from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux"
import {TiDelete} from 'react-icons/ti'
import {addTask,removeTask,updateTable} from '../redux_toolkit/features/tableSlice'
import { useContext,useEffect  } from "react"
import { SocketContext } from '../context/SocketContextProvider';
import { useSelector } from "react-redux"


const Task = ({task,setActiveStage,stageWidth,color}) => {

  const table = useSelector((state)=>state.table)
  const socket = useContext(SocketContext)

  const [dragging,setDragging] = React.useState(false);
  const [index,setIndex] = React.useState({start:null,end:null});
  
  const dispatch = useDispatch()
  
  const notify = () =>{
    toast.warn("Task deleted")
  }

  const handleDrag = (e) =>{
   
   console.log(e.clientX)
    setIndex({...index,end:Math.floor(e.clientX/stageWidth)})
    setActiveStage(index.end)
    // setDragging(true)
  }

  const handleDragStart = (e) =>{

    setIndex({...index,start:Math.floor(e.clientX/stageWidth)})
  }

  const handleDragEnd = (e,task) =>{
    dispatch(removeTask({id:task.id,index:index.start}))
    dispatch(addTask({task:task,index:index.end}))
    setDragging(false)
    setActiveStage(null)
    setIndex({start:null,end:null})
    socket.emit('update-table',table)
  }

  const deleteTask = (e,taskID) =>{
    let index = Math.floor(e.clientX/stageWidth)
    console.log(index)
    dispatch(removeTask({id:taskID,index:index}))
    notify()
  }
  return (
  
    <div id={task.id} onDrag={handleDrag} onDragEnd={(e)=>handleDragEnd(e,task)} onDragStart={handleDragStart}  draggable 
          className={`flex justify-between items-top p-2 border-2 ${color} mt-2 rounded-md  ${dragging?'opacity-40':''}`}>
            
             <p className="text-neutral-200 text-sm max-h-[300px] overflow-y-scroll  max-w-[90%]">{task.desc}</p>
             <TiDelete size={18} className='text-white hover:text-red-600 cursor-pointer' onClick={(e)=>{deleteTask(e,task.id)}}/>
    </div>
  )
}

export default Task