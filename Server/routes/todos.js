const express = require("express")
const Todo = require("../models/todo")
const router = express.Router()

router.route("/todos").get(async (_,res)=>{
  try {
    const todos = await Todo.find({})
    res.status(200).json({success:1,todos,message: "Found All Todos."})
  } catch(err) {
    res.status(err.statusCode || 500).json({success:0,message:err.message||"Coudn't get todos for some reasons."})
  }
})
router.route("/new").post(async (req,res)=>{
  try {
    const newTodo = req.body
    const todo = await Todo.create(newTodo)
    res.status(201).json({todo,success: 1,message: "New todo added successfully."})
  } catch (err) {
    res.status(err.statusCode||500).json({success: 0,message:err.message || "Something went wrong during the registering new todo."})
  }
})
router.route("/done").get(async(req,res) => {
  try{ 
    const id = req.query.id
    const todo = await Todo.findById(id)
    if(!todo) return res.status(404).json({success: 0 ,message:"This todo does not exist anymore."})
    if(todo.isDone) {
      await Todo.findByIdAndUpdate(id,{isDone:false})
      res.status(200).json({success: 1,message: todo.topic+" "+"not completed yet."})
    } else {
      await Todo.findByIdAndUpdate(id,{isDone:true})
      res.status(200).json({success: 1,message: todo.topic+" "+"completed."})
    }
  }catch(err){
    res.status(err.statusCode || 500).json({success:0,message:err.message || "Something went wrong."})
  }
})
router.route("/delete").get(async(req,res)=>{
  try {
    const id = req.query.id
    const todo = await Todo.findById(id)
    if(!todo) return res.status(404).json({success: 0,message: "This todo does not exist anymore."})
    await Todo.findByIdAndDelete(id)
    res.status(200).json({success: 0,message:"Todo delete successfully."})
  } catch(err){
    res.status(err.statusCode || 500 ).json({success: 0,message: err.message || "Couldn't delete the todo for some reasons."})
  }
})
module.exports = router