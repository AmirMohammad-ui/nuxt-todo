const path = require('path')
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes/todos")
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname,'../Client/assets')))
app.use(cors())
app.use(routes)


const port = process.env.PORT || 4400
mongoose.connect("mongodb://localhost/nuxt-todo",{
  useNewUrlParser:true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(()=>{
  app.listen(port,()=>console.log("Server is running on port :",port))
}).catch(err => {
  console.error("Couldn't connect to mongodb !!!",err.message)
})

