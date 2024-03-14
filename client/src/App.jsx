import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null); // Track the ID of the task being edited
  const [updatedTask, setUpdatedTask] = useState(""); // Track the updated task description

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/task");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addHandler = async () => {
    try {
      await axios.post("http://localhost:3000/task", { task: newTask });
      setNewTask(""); // Clear the input field after adding a new task
      fetchTasks();
    } catch (error) {
      alert("Task cannot be empty");
      console.error("Error adding task:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/task/${id}`);
      console.log(res);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = async (id, taskDescription) => {
    try {
      // Set the task description to the updatedTask state
      setUpdatedTask(taskDescription);
      setEditTaskId(id);
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  const updateHandler = async (id) => {
    try {
      // Send PUT request to update the task with the new task description
      await axios.put(`http://localhost:3000/task/${id}`, { task: updatedTask });
      setEditTaskId(null); // Reset editTaskId after updating the task
      setUpdatedTask(""); // Clear the updatedTask state
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <h1>Task-World</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addHandler}>Add</button>

      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div style={{ display: "flex" }} key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  type="text"
                  value={updatedTask}
                  onChange={(e) => setUpdatedTask(e.target.value)}
                />
                <button onClick={() => updateHandler(task.id)}>Update</button> {/* Change button text to "Update" */}
              </>
            ) : (
              <>
                <p>{task.task}</p>
                <button onClick={() => deleteHandler(task.id)}>Delete</button>
                <button onClick={() => editHandler(task.id, task.task)}>Edit</button>
              </>
            )}
          </div>
        ))
      ) : (
        <h1>No tasks found</h1>
      )}
    </>
  );
}

export default App;
