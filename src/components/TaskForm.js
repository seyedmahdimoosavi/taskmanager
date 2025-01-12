import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const TaskForm = React.memo(({ selectedTask, clearSelectedTask }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  useEffect(() => {
    if (selectedTask) {
      setTask(selectedTask);
    } else {
      setTask({ title: "", description: "", status: "Pending" });
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedTask) {
      axios
        .put(`http://localhost:5000/tasks/${task._id}`, task)
        .then((response) => {
          dispatch({ type: "UPDATE_TASK", payload: response.data.data });
          clearSelectedTask();
        })
        .catch((error) => console.error("Error updating task:", error));
    } else {
      axios
        .post("http://localhost:5000/tasks", task)
        .then((response) => {
          dispatch({ type: "ADD_TASK", payload: response.data });
        })
        .catch((error) => console.error("Error adding task:", error));
    }

    setTask({ title: "", description: "", status: "Pending" });
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-[50vw] mx-auto mb-10"
      >
        <div className="flex flex-col gap-1">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-400 rounded-xl px-2 h-10 focus:outline-none focus:border-blue-400"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Description</label>
          <textarea
            placeholder="Description"
            className="border border-gray-400 rounded-xl px-2 min-h-10 resize-y max-h-20 focus:outline-none focus:border-blue-400"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Status</label>
          <select
            className="border border-gray-400 rounded-xl px-2 h-10 focus:outline-none focus:border-blue-400"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        {selectedTask?._id ? (
          <button
            type="submit"
            className="w-full h-10 rounded-xl bg-yellow-400 text-white"
          >
            Edit Task
          </button>
        ) : (
          <button
            type="submit"
            className="w-full h-10 rounded-xl bg-blue-400 text-white"
          >
            Add Task
          </button>
        )}
      </form>
      
    </div>
  );
});

export default TaskForm;
