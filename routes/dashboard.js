import express from 'express'
import user from './schema.js'
import path from 'path'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()

const auth = async (req, res, next) => {
    const authhead = req.headers['auth']
    // console.log("Request path:", req.url, " | Headers:", authhead)

    if(!authhead || !authhead.startsWith('authx ')){
        return res.status(401).json({message:'ACCESS DENIED!'})
    }

    const token = authhead.split(' ')[1]

    try {

        const verified = await jwt.verify(token,process.env.AUTH_KEY)
        req.user = verified
        // console.log(req.user?.email)
        next()

    } catch (e) {
        return res.status(402).json({message:'INVAILD TOKEN!'})
    }
}


router.get('/dashboard', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '..', 'src/dashboard.html'))
})
router.get('/dashboard-data',auth, (req, res) => {
    res.status(201).json({ 
        message:`HEY, ${req.user.name}`, //dashboard data for example
    })
})


export default router