import {Router} from "express";
import {
    login,
    signup,
    googleAuth,
    googleAuthCallback,
    appleAuth,
    appleAuthCallback
} from "@controllers/authController";

const authRoute = Router()

authRoute.get('/login', login)
authRoute.post('/signup', signup)
authRoute.get('/google', googleAuth)
authRoute.get('/google/callback', googleAuthCallback)
authRoute.get('/apple', appleAuth)
authRoute.post('/apple/callback', appleAuthCallback)


export default authRoute