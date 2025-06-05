import React from 'react'
import {Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogout = async() => {
      try {
        const response = await fetch("http://localhost:5000/logout", {
          method: "POST",
          credentials: "include",
        });

        const result = await response.json()

        if(response.ok){
          console.log(response)
          alert("You are logged out!!")
          navigate("/")
        } else{
          alert(result.message || "Logout failed");
        }

      } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred");
      }
  }


  return (
    <nav className="bg-black flex text-white  justify-between items-center h-12">
      <div className="flex gap-20">
        <h1 className="font-bold text-lg ml-2">Trackify</h1>
        <Link to="/tasks" className=" hover:underline">All Task</Link>
        <Link to="/task" className="hover:underline">Create Task</Link>
      </div>
      <div className="flex gap-20">
        <h2>contact Us</h2>
        <button onClick={handleLogout} className="mr-3 hover:underline">Logout</button>
      </div>
    </nav>
  )
}

export default Navbar