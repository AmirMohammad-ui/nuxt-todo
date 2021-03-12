const express = require("express")
const Todo = require("../models/todo")
const router = express.Router()

//  GETTING ALL THE TODOS
router.route("/todos").get(async (_,res)=>{
  try {
    const todos = await Todo.find({})
    res.status(200).json({success:1,todos,message: "Found All Todos."})
  } catch(err) {
    res.status(err.statusCode || 500).json({success:0,message:err.message||"Coudn't get todos for some reasons."})
  }
})
//  POSTING A NEW TODO
router.route("/new").post(async (req,res)=>{
  try {
    const newTodo = req.body
    const todo = await Todo.create(newTodo)
    res.status(201).json({todo,success: 1,message: "New todo added successfully."})
  } catch (err) {
    res.status(err.statusCode||500).json({success: 0,message:err.message || "Something went wrong during the registering new todo."})
  }
})
// UPDATING THE TODO STATUS
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
//  DELETING THE TODO
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
// FINDING A TODO 
router.route("/find").get(async (req,res)=>{
  try{
    const q = req.query.text
    if(q === '' || q === null) return res.status(400).json({success: 0,message:"Please enter the query you are looking for."})
    const todos  = await Todo.find({topic: {$regex: new RegExp(q)}})
    if(todos.length === 0) return res.status(404).json({success: 0,message: "Couln't find the todo you are looking for."})
    res.status(200).json({success:1,message: `Found ${todos.length} todos.`,todos})
  }catch(err){
    res.status(err.statusCode || 500).json({success: 0,message: err.message || "Something went wrong while finding the todo."})
  }
})
module.exports = router