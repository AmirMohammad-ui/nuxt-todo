<template>
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
      <form @submit.prevent="">
        <input class="p-5 text-xl shadow focus:shadow-md" placeholder="Search For A Todo">
        <button type="submit" class="p-5 text-xl font-light text-gray-100 bg-indigo-900">Search</button>
      </form>
    </div>
  </header>
</template>

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