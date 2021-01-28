import config from './config/config'
import mongoose from 'mongoose'

/**
 * Connection to DB
 * Using Mongoose
 * MongoClientOptions
 */
mongoose.connect(config.DB.URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection 

connection.once("open", ()=>{
  console.log("Connection stablished!")
})

connection.on("error", (err)=>{
  console.log(err)
  process.exit(0)
})