/* eslint-disable react/prop-types */

import Task from "./Task"

const Stage = ({data}) => {
    let active = true
  return (
    <div className={`w-1/3 border-[1px] p-2 overflow-y-scroll ${active?"border-neutral-800":"border-black "}`}>
        <div className="text-white font-bold">
        {data.name}
        </div>
        <div className=" "> 
        {
            data.tasks && data.tasks.map(task=>{
                return (<Task key={task.id} task = {task}/>)
            })
        }
        </div>

    </div>
  )
}



export default Stage