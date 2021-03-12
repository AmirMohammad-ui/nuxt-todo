<template>
  <div>
    <base-modal v-if="isModalOpen" title="Results" @close-modal="closeSearchResultBox">
      <ul class="grid grid-cols-1 lg:grid-cols-2">
        <li
          class="m-5"
          v-for="todo in todosFound"
          :key="todo._id"
        >
          <todo-items
            :topic="todo.topic"
            :description="todo.description"
            :id="todo._id"
            :isDone="todo.isDone"/>
        </li>
      </ul>
    </base-modal>
    <base-alert v-if="alertOpen" :success="alertSuccess" :title="alertTitle">{{alertMessage}}</base-alert>
    <header class="flex items-center content-center justify-between w-full p-8 mb-10 bg-gray-200">
      <ul class="flex space-x-10 text-gray-600">
        <li class="float-left">
          <nuxt-link class="p-6 border border-gray-300 hover:bg-gray-100" to="/all-todos">All Todos</nuxt-link>  
        </li>
        <li class="float-left">
          <button @click="$emit('open-modal',$event)" class="focus:border-none focus:outline-none focus:ring-0">New Todo</button>  
        </li>
      </ul>
      <div class="float-left">
        <form @submit.prevent="findTodos">
          <input class="p-5 text-xl shadow focus:shadow-md" placeholder="Search For A Todo" v-model="text">
          <button type="submit" class="p-5 text-xl font-light text-gray-100 bg-indigo-900 focus:border-none focus:outline-none">Search</button>
        </form>
      </div>
  </header>
  </div>
</template>
<script>
import axios from "axios"
import TodoItems from "~/components/Todos/TodoItems"
import BaseAlert from "~/components/UI/BaseAlert"
import BaseModal from "~/components/UI/BaseModal"
export default {
  components: {BaseAlert,BaseModal,TodoItems},
  data(){
    return {
      text: '',
      todosFound: null,
      alertOpen: false,
      alertMessage: '',
      alertTitle: '',
      alertSuccess: null,
      isModalOpen: false
    }
  },
  methods: {
    findTodos(){
      axios.get("/find",{params: {text:this.text}})
      .then(res=> {this.showAlert({success: 1,message: res.data.message});this.todosFound = res.data.todos;this.showSearchResult()})
      .catch(err=>this.showAlert({success: 0,message: err.response.data.message || "Something went wrong finding todos."}))
    },
    showAlert(data){
      this.alertMessage = data.message
      this.alertSuccess = data.success
      this.alertTitle = data.success === 1 ? 'Successful':'Error'
      this.alertOpen = true
      setTimeout(()=>{
        this.alertOpen = false
      },2000)
    },
    showSearchResult(){
      this.isModalOpen = true
    },
    closeSearchResultBox(){
      this.isModalOpen = false
    }
  },
  mounted(){
    axios.defaults.baseURL = "http://localhost:4400"
  }
}
</script>
<style scoped>
@media (max-width: 580px){
  header{
    flex-direction: column; 
  }
  header > div {
    margin-top: 3rem;
  }
}
header {
  background: transparent;
  box-shadow: 0 0 40px -30px #404040;
  font-size: 2rem;
  margin: 5rem 0;
}
</style>