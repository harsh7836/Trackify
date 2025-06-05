import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
      })
  
      console.log(response)
  
      const result = await response.json()
      console.log(result)
  
      if (response.ok) {
        alert("Login successful!");
        navigate("/tasks")
        setEmail("");
        setPassword("");
      }
      if(!response.ok){
        alert(result.message || "Login failed");
        console.log(result);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred");
    }

  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-300">
      <h1 className='text-6xl mb-20'>Trackify</h1>
  <div className="border-2 border-gray-700 w-3/5 h-[400px] flex flex-col items-center  bg-white">
    <h1 className="mt-4 font-bold text-3xl underline">Login</h1>
    <div className="flex flex-col justify-center mt-12 w-1/3">
      <label for="email" className="font-medium text-xl">Email</label>
      <input type="text" id="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5 border-2 shadow-2xl bg-blue-100 rounded"/>
    </div>
    <div className="flex flex-col mt-8 w-1/3">
      <label for="password" className="font-medium text-xl">Password</label>
      <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1.5 border-2 shadow-2xl bg-blue-100 rounded"/>
    </div>
    <button type="submit" className="mt-12 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer h-9 w-30">Submit</button>
  </div>
</form>
  )
}

export default Login