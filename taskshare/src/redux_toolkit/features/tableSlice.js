import { createSlice , current} from '@reduxjs/toolkit'
import { socket } from '../../context/SocketContextProvider'
const initialState = {
    table:[
        
        {
            name:'To-Do',
            tasks : [] 
        },
        {
            name:'In Progress',
            tasks : [] 
        },
        {
            name:'Complete',
            tasks : [] 
        }

]}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {

    updateTable : (state,action) => {
        if(action.payload.data == null){
            return
        }


        state.table = [...action.payload.data];
    },
    
    addTask: (state,action) => {
        if(action.payload.index == null){
            return
        }
        console.log(action.payload.index)
        state.table[action.payload.index].tasks.push(action.payload.task)
        // socket.emit('update-table',current(state.table))
        let currentState = current(state.table)

        console.log("update-table",[...currentState])
        socket.emit("update-table",[...currentState])

        
    },

    removeTask:(state,action)=>{
        
        if(action.payload.index == null){
            return
        }
        state.table[action.payload.index].tasks = 
        
        [...state.table[action.payload.index]
        .tasks.filter((task)=>
        {
            return task.id !== action.payload.id
        }
        )
    ]
    console.log(action)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTask,removeTask,updateTable } = tableSlice.actions

export default tableSlice.reducer