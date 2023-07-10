import { useEffect, useRef, useState } from "react"
import Stage from "./Stage"
import { useSelector,useDispatch } from "react-redux"
import {addTask,updateTable} from '../redux_toolkit/features/tableSlice'
import {v4 as uuid4} from 'uuid'
import { ToastContainer } from 'react-toastify';
import {GrAdd} from 'react-icons/gr'
import { useContext } from "react"
import { SocketContext } from "../context/SocketContextProvider"

const Table = () => {
    
    const [taskDesc,setTaskDesc] = useState('')
    let activeStage = null
    const setActiveStage = ( index) =>{
        activeStage = index
    }
    // const [activeStage,setActiveStage] = useState(null);
    const color = ['border-neutral-900','border-blue-400','border-green-400']
    const tableRef = useRef(null)
    const table = useSelector((state)=>state.table)
    const dispatch = useDispatch()
    
    const [stageWidth,setStageWidth] = useState(null)
    
    const socket = useContext(SocketContext)

    const addNewTask = () =>{

        dispatch(addTask({task:{id:uuid4(),desc:taskDesc},index:0}))
        socket.emit('update-table',table)
        setTaskDesc('')
    
    }

    useEffect(()=>{

        socket.on("updated-table",(data)=>
        {  
           dispatch(updateTable({data:data}))
       })


    },[socket])

    
    
    return (<div className="w-full h-screen bg-black">
            
            <ToastContainer theme="dark" autoClose="1000" position="top-center"/>
            
            <div className="h-[10%] flex justify-between items-center p-2 ">
                    {<h1 className="text-neutral-600 text-xl ml-2 font-bold">Project Name</h1>}
                   
                   <div className="flex mr-4">
                        <input value={taskDesc} onChange={(e)=>{setTaskDesc(e.target.value)}} placeholder="New Task" className=" w-full max-w-[300px]  p-1 px-2 text-neutral-200 bg-neutral-900 text-neutral-400 rounded-md border-2 border-neutral-600 active:border-neutral-400" type="text" />
                        <button onClick={addNewTask} className=" bg-white rounded-md ml-4 px-2"><GrAdd className="pointer-events-none font-bold"/></button>
                   </div>   
                       
            </div>
            
            <div ref={tableRef} className="w-full h-[90%] flex">
            
                {table && 

                    table?.table?.map((element,index) => {
                        return <Stage color={color[index]}  stageWidth={tableRef.current?.clientWidth/3} setActiveStage={setActiveStage} key={uuid4()} active={activeStage === index} data={element} />
                    })
                    
                }
            
            </div>
    </div>
    
    )
}

export default Table