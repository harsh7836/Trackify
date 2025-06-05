import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './Routes/user.routes.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import taskRouter from './Routes/task.routes.js';

dotenv.config();


const app = express()
const PORT = process.env.PORT || 5000
app.use(bodyParser.json())
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
  credentials: true
}))

app.use("/", userRouter)
app.use('/', taskRouter)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
    console.log(`App is connected to port ${PORT}`);
    })
}).catch((err) => {
    console.log(err);
})

