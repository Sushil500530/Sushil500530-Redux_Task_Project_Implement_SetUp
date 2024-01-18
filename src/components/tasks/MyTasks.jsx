import { CheckIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, userTasks } from "../../redux/features/task/taskSlice";
import TasksDetailsModal from "./TasksDetailsModal";

const MyTasks = () => {
     const {tasks, userSpecificTasks } = useSelector((state) => state.taskSlice);
     const {name:userName} = useSelector((state)=> state.userSlice);
     const dispatch = useDispatch();
     const [isOpen,setIsOpen] = useState(false);
     const [taskId,setTaskId] = useState(0);
     
    //  console.log(tasks);
    //  console.log(userSpecificTasks);
    const handleShowModal = (id) => {
        setTaskId(id);
        setIsOpen(!isOpen);
    }

     useEffect(()=> {
        dispatch(userTasks(userName))
     },[userName,dispatch,tasks ])
    //  const tasks = [{
    //     id: 1,
    //     status: 'pending',
    //     title: 'Remove Button',
    //     description:
    //       'We need a remove button in our task card. Meke the button red and use Heroicon for tashbin icon.',
    //     date: '2023-08-28',
    //     assignedTo: 'Mir Hussain',
    //     priority: 'high',
    //   }];
    //   console.log(tasks);
    return (
        <div>
            <TasksDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} id={taskId} />
            <h1 className="text-xl my-3">My Tasks</h1>
            <div className=" h-[750px] overflow-auto space-y-3">
                {userSpecificTasks?.map(item => <div
                    key={item.id}
                    className="bg-secondary/10 rounded-md p-3 flex justify-between"
                >
                    <h1>{item.title}</h1>
                    <div className="flex gap-3">
                        <button onClick={()=> handleShowModal(item?.id)} className="grid place-content-center" title="Details">
                            <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
                        </button>
                        <button onClick={()=> dispatch(updateTask({id: item?.id, status: 'done'}))} className="grid place-content-center" title="Done">
                            <CheckIcon className="w-5 h-5 text-primary" />
                        </button>
                    </div>
                </div>)}
            </div>
        </div>
    );
};

export default MyTasks;