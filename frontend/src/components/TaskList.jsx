import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setTasks(data);
      } else {
        alert(data.message || "Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("An error occurred while fetching tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>

      <button 
        onClick={() => navigate("/task")} 
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Create Task
      </button>

      <div className="w-full max-w-xl">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 mb-4 shadow rounded">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-700 mt-1">{task.discription}</p>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default TaskList;