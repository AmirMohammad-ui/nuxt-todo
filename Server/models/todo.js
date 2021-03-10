const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  description: {
    type:String,
    required:true,
  },
  topic:{
    type:String,
    required:true
  },
  isDone:{
    type: Boolean,
    default:false
  },
  expireDate: {
    type:Date
  },
  dateCreated: {
    type:Date,
    default: Date.now()
  }
})


const Todo = new mongoose.model("todo",schema)
module.exports = Todo

