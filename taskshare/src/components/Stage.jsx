/* eslint-disable react/prop-types */
import Task from "./Task"

const Stage = ({color,data,setActiveStage,active,stageWidth}) => {

  return (

      <div className={`w-1/3 border-[1px] p-2 overflow-y-scroll ${active?"border-white":"border-neutral-800 "}`}>
  
        <div className="text-white font-bold">

          {data.name}

        </div>

        <div> 
        
        {
        
            data.tasks && data.tasks.map(task=>{

              return (<Task color={color} stageWidth={stageWidth} setActiveStage={setActiveStage} key={task.id} task = {task}/>)

            })
        
        }
        
        </div>

    </div>

  )

}

export default Stage