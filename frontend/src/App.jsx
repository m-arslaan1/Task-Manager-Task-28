import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./Axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "", completed: false });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({ title: "", description: "", completed: false });

  useEffect(() => {
    getTasks().then((response) => setTasks(response));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditTask({ ...editTask, [name]: value });
  };

  const handleCreateTask = () => {
    createTask(task)
      .then((response) => {
        setTasks([...tasks, response]);
        setTask({ title: "", description: "", completed: false });
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const taskToUpdate = updatedTasks.find((task) => task._id === taskId);
    updateTask(taskId, taskToUpdate).catch((error) => {
      console.error("Error updating task:", error);
    });
  };

  const handleUpdateTask = (id) => {
    const updatedTask = {
      ...tasks.find((t) => t._id === id),
      title: editTask.title || tasks.find((t) => t._id === id).title,
      description: editTask.description || tasks.find((t) => t._id === id).description,
    };

    updateTask(id, updatedTask)
      .then((response) => {
        const updatedTasks = tasks.map((t) => (t._id === id ? response : t));
        setTasks(updatedTasks);
        setEditTaskId(null); 
        setEditTask({ title: "", description: "", completed: false }); 
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const handleDeleteTask = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter((t) => t._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleEditClick = (task) => {
    setEditTaskId(task._id);
    setEditTask({ title: task.title, description: task.description, completed: task.completed });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="block w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="block w-full mb-2 p-2 border rounded"
        />
        <button
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg mb-4 hover:bg-blue-700 transition duration-200"
          onClick={handleCreateTask}
        >
          Create Task
        </button>
      </div>
      <ul className="list-none p-0">
        {tasks.map((task) => (
          <li key={task._id} className="mb-4 p-4 border rounded-lg shadow-md">
            {editTaskId === task._id ? (
              <div>
                <input
                  type="text"
                  name="title"
                  value={editTask.title}
                  onChange={handleEditInputChange}
                  placeholder="Title"
                  className="block w-full mb-2 p-2 border rounded"
                />
                <input
                  type="text"
                  name="description"
                  value={editTask.description}
                  onChange={handleEditInputChange}
                  placeholder="Description"
                  className="block w-full mb-2 p-2 border rounded"
                />
                <button
                  onClick={() => handleUpdateTask(task._id)}
                  className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 hover:bg-green-700 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditTaskId(null)}
                  className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold">{task.title}</h2>
                <p className="text-gray-700">{task.description}</p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task._id)}
                    className="mr-2"
                  />
                  <p className={task.completed ? "text-green-600" : "text-red-600"}>
                    {task.completed ? "Completed" : "Not Completed"}
                  </p>
                </div>
                <button
                  onClick={() => handleEditClick(task)}
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 hover:bg-blue-700 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;