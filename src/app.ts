import express from 'express'
import morgan from 'morgan'

const app = express()

//Settings
app.set('port', 3000)

//Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes
app.get('/', (req,res)=>{
  res.send(`The API is at http://127.0.0.1:${app.get('port')}`)
})

export default app

