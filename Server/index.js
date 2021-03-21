const path = require('path')
require("dotenv").config({path: "./.env"})
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const apis = require("./apis/todos")
const app = express()
const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT
} = process.env

const port = process.env.PORT || 4400
let URI = `mongodb://localhost/nuxt-todo`
if (process.env.NODE_ENV === 'production') {
  URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
}
mongoose.connect(URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Mongodb connected.")
}).catch(err => {
  console.error("Couldn't connect to mongodb !!!", err.message)
})
app.use(express.json())

app.use(cors())
app.use(apis)
if(process.env.NODE_ENV==='production'){
  app.use(express.static(path.join(__dirname, '../Client/assets')))
  app.get(/.*/, (_, res) => {
    res.sendFile(path.join(__dirname,'./public','index.html'))
  })
}

app.listen(port, () => console.log("Server is running on port :", port))
