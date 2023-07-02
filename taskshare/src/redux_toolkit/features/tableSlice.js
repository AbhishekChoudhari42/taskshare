import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    table:[
        
        {
            name:'To-Do',
            active:false,
            tasks : [] 
        },
        {
            name:'In Progress',
            active:false,
            tasks : [] 
        },
        {
            name:'Complete',
            active:false,
            tasks : [] 
        }

]}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addTask: (state,action) => {
        if(action.payload.index == null){
            return
        }
        state.table[action.payload.index].tasks.push(action.payload.task)
    },
    removeTask:(state,action)=>{
        if(action.payload.index == null){
            return
        }
        state.table[action.payload.index]
            .tasks = [...state.table[action.payload.index]
                        .tasks.filter((task)=>
                            {
                                return task.id !== action.payload.id
                            }
                        )
                    ]
     }
  },
})

// Action creators are generated for each case reducer function
export const { addTask,removeTask } = tableSlice.actions

export default tableSlice.reducer