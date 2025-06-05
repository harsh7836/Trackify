import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const requireAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: "Token not found"})
        }

        const data = jwt.verify(token, process.env.JWT_SECRET)
        if(!data){
            return res.status(404).json({message: "user not found"})
        }
        req.user = data;
        next();
    } catch (error) {
        return res.status(400).json({message: "somthing wrong"})
    }
}