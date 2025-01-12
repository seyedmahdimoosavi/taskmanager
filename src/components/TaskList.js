import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TaskList = React.memo(({ setSelectedTask }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [currentstatus, setCurrentstatus] = useState(null);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        dispatch({ type: "DELETE_TASK", payload: id });
        // dispatch(deleteTask(id));
        console.log(tasks);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
  };

  return (
    <div>
      <div className="flex justify-center mb-10">
        <div className="flex flex-col gap-1">
          <label>Status</label>
          <select
            className="border border-gray-400 rounded-xl px-2 h-10 focus:outline-none focus:border-blue-400"
            value={currentstatus}
            onChange={(e) => {
              setCurrentstatus(e.target.value);
            }}
          >
            <option value={null}></option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-2 my-4 gap-4">
        {tasks?.tasks
          ?.filter((task) =>
            currentstatus ? task.status == currentstatus : task
          )
          .map((task) => (
            <div
              key={task._id}
              className="p-2 border col-span-1 border-gray-400 rounded-xl flex flex-col gap-2 "
            >
              <div className="flex gap-1">
                <span className="">Title:</span>
                {task.title}
              </div>
              <div className="flex gap-1">
                <span className="">Description:</span>
                {task.description}
              </div>
              <div className="flex gap-1">
                <span className="">Status:</span>
                {task.status}
              </div>
              <div className="flex w-full gap-2 mt-6">
                <button
                  onClick={() => handleDelete(task._id)}
                  className="w-20 rounded-xl flex-1 bg-red-500 text-white h-10 flex justify-center items-center"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    handleEdit(task);
                  }}
                  className="bg-blue-500 flex-1 h-10 flex rounded-xl justify-center items-center text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
});

export default TaskList;
