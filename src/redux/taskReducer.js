const initialState = [];

// Reducer
const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload }
            : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };

    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "MERGE_TASKS":
      return {
        ...state,
        tasks: [
          ...state,
          ...action.payload.filter(
            (newTask) => !state.some((task) => task._id === newTask._id)
          ),
        ],
      };

    default:
      return state;
  }
};

export default tasksReducer;
