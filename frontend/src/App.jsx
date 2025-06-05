import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Signup from './pages/signup'
import Login from './pages/login'
import CreateTask from './components/CreateTask'
import TaskList from './components/TaskList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/task' element={<CreateTask/>}/>
        <Route path='/tasks' element={<TaskList/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
