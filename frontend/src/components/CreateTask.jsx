import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const CreateTask = () => {
    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!title){
            alert("Title Required")
        }

        try {
           const response = await fetch("http://localhost:5000/task", {
            method: "POST",
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, discription: discription }),
           }) 

           const result = await response.json()

           if (response.ok) {
            alert("Task created successful!");
            navigate("/tasks")
            setTitle("");
            setDiscription("");
           }
           if(!response.ok){
            alert(data.message || "Failed to create task");
            console.log(result);
            setTitle("");
            setDiscription("");
           }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred");
        }
    }

  return (
    <>
    <Navbar/>
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-300" >
  <div className="border-2 border-gray-700 h-100 flex flex-col  bg-white w-full" >
    <h1 className="font-bold text-xl my-2 flex justify-center underline" >Create Task</h1>
    <div className="flex flex-col mt-5" >
      <label for="title" className="font-medium w-10 text-lg" >Title:</label>
      <input type="text" id="title" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 shadow-2xl bg-blue-100 mt-1.5 rounded w-60" />
    </div>
    <div className="flex flex-col mt-3 " >
      <label for="Discription" className="font-medium w-10 text-lg" >Discription:</label>
      <textarea id="Discription" placeholder="Enter Discription"  rows="6" value={discription} onChange={(e) => setDiscription(e.target.value)} className="mt-1.5 border-2 shadow-2xl bg-blue-100 rounded" ></textarea>
    </div>
    <div className="flex justify-center" >
      <button type="submit" className=" w-20  mt-6 bg-blue-600  text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer h-9 " >Create</button>
    </div>
  </div>
</form>
</>
  )
}

export default CreateTask