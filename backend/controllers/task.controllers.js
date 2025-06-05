import { Task } from "../models/task.models.js";

export const createTask = async(req, res) => {
    try {
        const {title, discription, user} = req.body
        if(!title){
            return res.status(404).json({message: "Provide full details"})
        }
        console.log(req.user)
        const task = await Task.create({title, discription, user: req.user._id})
        console.log(task)
        return res.status(200).json(task)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "something went wrong"})
    }
}

export const gettingTask = async(req, res) => {
    try {
        const userId = req.user._id
        const tasks = await Task.find({user: userId})
        console.log(tasks)
        return res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "something went wrong"})
    }
}