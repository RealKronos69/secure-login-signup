import express from 'express'
import user from './schema.js'
import path from 'path'
import bcrypt from 'bcrypt'
const router = express.Router()

router.get('/', async (req, res) => {
    res.sendFile(path.join(import.meta.dirname, '..', 'src', 'signup.html'))
})
router.post('/', async (req, res) => {
    try {


        const { name, email, password } = req.body
        const exists = await user.findOne({ email })
        if (exists) {
            return res.status(400).json({ message: 'USER ALREADY EXISTS!' })
        }
        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'ALL FIELDS ARE REQUIRED!'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: 'PASSWORD MUST BE ATLEAST 8 DIGIT!'
            });
        }
        const hashpassword = await bcrypt.hash(password, 10)
        await user.create({
            name: name,
            email: email,
            password: hashpassword
        })

        return res.status(201).json({ message: 'ACCOUNT CREATED!' })

    } catch (e) {

        if (e.name = "ValidationError") {

            return res.status(400).json({ message: 'VALIDATION ERROR!' });
        }

        return res.status(500).json({ message: 'SERVER ERROR' });

    }
})

export default router