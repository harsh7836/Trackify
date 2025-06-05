import mongoose, { mongo } from 'mongoose'

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    discription: {
        type: String,
        default: ""
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Task = mongoose.model('Task', taskSchema)