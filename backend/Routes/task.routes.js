import express from 'express'

import { createTask, gettingTask } from '../controllers/task.controllers.js'
import { requireAuth } from '../middleware/auth.middleware.js'

const taskRouter = express.Router()




taskRouter.post("/task", requireAuth, createTask)

taskRouter.get("/tasks",requireAuth, gettingTask)


export default taskRouter