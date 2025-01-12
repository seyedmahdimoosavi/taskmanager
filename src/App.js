import axios from "axios";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import store from "./redux/store";
import { useSelector } from "react-redux";

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = useSelector((state) => state.tasks);

  const clearSelectedTask = () => setSelectedTask(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/tasks")
      .then((response) => {
        dispatch({ type: "SET_TASKS", payload: response.data.data });
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="app">
      {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
      <h1>Task Management Dashboard</h1>
      <TaskForm
        selectedTask={selectedTask}
        clearSelectedTask={clearSelectedTask}
      />
      <TaskList setSelectedTask={setSelectedTask} />
      {/* </PersistGate> */}
    </div>
  );
}

export default App;
