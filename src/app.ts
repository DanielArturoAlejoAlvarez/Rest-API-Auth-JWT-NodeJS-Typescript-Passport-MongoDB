import config from './config/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app = express()

//Settings
app.set('port', config.port)

//Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.get('/', (req,res)=>{
  res.send(`The API is at http://127.0.0.1:${app.get('port')}`)
})

export default app

