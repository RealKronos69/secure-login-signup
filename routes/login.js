import express from 'express'
import user from './schema.js'
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.get('/', (req, res) => {

    res.sendFile(path.join(import.meta.dirname, '..', 'src/login.html'))
})
router.post('/', async (req, res) => {
    const { email, password } = req.body
    const existinguser = await user.findOne({ email })
    if (!existinguser) {
        return res.status(400).json({ message: 'USER DOES NOT EXISTS!' })
    }
    const match = await bcrypt.compare(password, existinguser.password)
    if (!match) {
        return res.status(400).json({ message: 'INVALID PASSWORD!' })
    }

    const token = await jwt.sign(
        {
            userID: existinguser._id,
            email: existinguser.email,
            name: existinguser.name,

        },
        process.env.AUTH_KEY,
        { expiresIn: '1h' }
    )

    return res.status(201).json({
        message: 'LOGGED IN!',
        token
    })
})


export default router