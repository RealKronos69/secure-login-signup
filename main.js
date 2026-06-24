import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import user from './routes/schema.js'
import signup from './routes/signup.js'
import login from './routes/login.js'
import dashboard from './routes/dashboard.js'
dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('src'))
app.use('/signup', signup)
app.use('/login', login)
app.use('/user', dashboard)


app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'src/index.html'))
})


app.listen(3000)