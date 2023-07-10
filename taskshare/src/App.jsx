import './App.css'
import Table from './components/Table'
import { io } from "socket.io-client"
import { useSelector,useDispatch } from "react-redux"
import {updateTable} from '../src/redux_toolkit/features/tableSlice'
import { useContext,useEffect  } from "react"
import { SocketContext } from './context/SocketContextProvider'

function App() {

  const dispatch = useDispatch()
  const table = useSelector((state)=>state.table)
  const socket = useContext(SocketContext)

  useEffect(()=>{
    
      
      socket.on("connect",()=>{
          console.log('connected ')
      })  

      socket.on("updated-table",(data)=>
      {  
         dispatch(updateTable({data:data}))
       
         console.log("updated new")
     })


     
  },[socket])
  return (
    <h1 className="">
      { table && <Table socket={socket}/>}
    </h1>
  )
}

export default App
