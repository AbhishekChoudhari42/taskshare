import { useEffect, useState } from "react"
import Stage from "./Stage"
import { useSelector,useDispatch } from "react-redux"
import {addTask} from '../redux_toolkit/features/tableSlice'
import {v4 as uuid4} from 'uuid'
import { ToastContainer } from 'react-toastify';
import {GrAdd} from 'react-icons/gr'

import { io } from "socket.io-client";


const Table = () => {
    

    const socket = io('http://localhost:3030');


    io.on("connection", (socket) => {
    
        socket.emit("hello", "world");
        alert("connected")
    
    });

    const [taskInput,setTaskInput] = useState(false)
    const [taskDesc,setTaskDesc] = useState('')
    const table = useSelector((state)=>state.table)
    const dispatch = useDispatch()

    const addNewTask = () =>{

        dispatch(addTask({task:{id:uuid4(),desc:taskDesc},index:0}))
        setTaskDesc('')
    
    }

    useEffect(()=>{
        
    },[])

    
    
    return (<div className="w-full h-screen bg-black">
            
            <ToastContainer theme="dark" autoClose="2000" position="top-center"/>
            
            <div className="h-[10%] flex justify-between items-center p-2 ">
                    <h1 className="text-neutral-600 text-xl font-bold">Project Name</h1>
                   
                    {taskInput && <div className="w-[300px] p-1 top-4 left-[50%] translate-x-[-50%] rounded-lg bg-[#111] flex justify-center items-center fixed ">
                        <div className="w-[400px] flex">
                            <input value={taskDesc} onChange={(e)=>{setTaskDesc(e.target.value)}} placeholder="New Task" className=" w-full  p-1 px-2 text-neutral-200 bg-neutral-800 rounded-md" type="text" />
                            <button onClick={addNewTask} className=" bg-blue-600 text-white rounded-md ml-1 px-2"><GrAdd className="text-white font-bold"/></button>
                        </div>
                    </div>}
                   
                    <button onClick={()=>{setTaskInput(!taskInput)}} className={`  ${taskInput?"bg-red-500":"bg-white"} px-2 py-2 text-neutral-800 text-lg rounded-md`}>{taskInput?<GrAdd color="#fff" className="rotate-45"/>:<GrAdd/>}</button>
            </div>
            
            <div className="w-full h-[90%] bg-black flex">
            
                {table && 

                    table?.table?.map(element => {
                        return <Stage key={element.name} data={element} />
                    })
                    
                }
            
            </div>
    </div>
    
    )
}

export default Table