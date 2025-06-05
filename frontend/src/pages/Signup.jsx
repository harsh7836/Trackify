import React, { useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    // const [error, setError] = useState("")

    const handleSubmit = async(e) => {
      e.preventDefault();

      try {
        const addUser = {userName, email, password};
  
        const response = await fetch("http://localhost:5000/signup", {
          method: "POST",
          body: JSON.stringify(addUser),
          headers: {
            "content-Type": "application/json",
          }
        });
  
        const result = await response.json();
  
        if(response.ok){
          alert("Signup successful");
          alert("please Login")
          navigate("/login")
          console.log(result.error)
          // setError(result.error);
          setUserName("");
          setEmail("");
          setPassword("");
        }
  
        if(!response.ok){
          alert(result.message || "Signup failed");
          console.log(result);
          setUserName("");
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred");
      }

    }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-300">
      <h1 className='text-6xl mb-14 underline'>Trackify</h1>
      <div className="border-2 border-gray-700 w-100 h-100 flex flex-col items-center bg-white w-2/3 h-[500px] mb-20">
        <h1 className="font-bold text-3xl my-2 flex justify-center underline ">SignUp</h1>
        <h2 className="text-shadow-2xs mb-10 mt-2 text-lg">Enter valid details for for signUp</h2>
        <div className="flex flex-col w-1/3">
          <label for="username" className="font-medium text-xl my-0.5">UserName</label>
          <input type="text" id="username" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)} className="border-2 shadow-2xl bg-blue-100 my-1 rounded" />
        </div>
        <div className="flex flex-col w-1/3 mt-4">
          <label for="email" className="font-medium text-xl">Email</label>
          <input type="email" id="email" placeholder="Enter Email" value={email} className="border-2 shadow-2xl bg-blue-100 my-1 rounded" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="flex flex-col w-1/3 mt-4">
          <label for="password" className="font-medium text-xl">Password</label>
          <input type="password" id="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-2 shadow-2xl bg-blue-100 my-1 rounded"/>
        </div>
        <div className='flex items-center space-x-2 mt-5'>
          <h1>Already have account?</h1>
          <Link to="/login" className="text-blue-600 hover:underline" >Login</Link>
        </div>
        <button type='submit' className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer h-9 mt-5 mb-2">Submit</button>
      </div>
    </form>
  )
}

export default Signup