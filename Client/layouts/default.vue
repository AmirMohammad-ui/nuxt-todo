<template>
  <div>
    <TheHeader @open-modal="openModal"/>
    <base-alert v-if="alertOpen" :success="alertSuccess" :title="alertTitle">{{alertMessage}}</base-alert>
    <base-modal @close-modal="isModalOpen = false" v-if="isModalOpen">
      <div class="grid grid-cols-1 sm:grid-cols-3">
        <div class="mx-5 mb-3 sm:col-span-1">
          <base-input type="text" label="Topic" @theValueInput="inputValChanged"/>
        </div>
        <div class="mx-5 mb-3 sm:col-span-2">
          <base-input type="text" label="Description" @theValueInput="inputValChanged"/>
        </div>
      </div>
      <div>
        <button @click="RegisterNewTodo" class="float-right p-2 px-4 mx-5 mt-2 mb-4 text-xl font-light tracking-wider text-green-600 border border-green-600 focus:outline-none hover:bg-green-600 hover:text-green-50">Submit</button>
      </div>
    </base-modal>
    <Nuxt/>
  </div>
</template>
<script>
import axios from "axios"
import BaseAlert from "~/components/UI/BaseAlert"
import TheHeader from '~/components/TheHeader'
import BaseModal from '~/components/UI/BaseModal'
import BaseInput from "~/components/UI/BaseInput"
export default {
  components: {
    TheHeader,BaseModal,BaseInput,BaseAlert
  },
  data(){
    return{
      isModalOpen:false,
      topic: '',
      description: '',
      alertOpen: false,
      alertMessage: '',
      alertTitle: '',
      alertSuccess: null
    }
  },
  methods:{
    inputValChanged(e,val){
      if(e.target.id === "Topic") {
        this.topic = val
      } else {
        this.description = val
      }
    },
    openModal(){
      this.isModalOpen = true
    },
    RegisterNewTodo(){
      if(this.topic === '') {
        this.showAlert({
          success: 0,
          message: 'Topic is Required.'
        })
        return 
      }
      if(this.description === ''){
        this.showAlert({
          success: 0,
          message: 'Description is Required.'
        })
        return
      }
      axios.post("/new",{topic:this.topic,description: this.description},{headers:{"ContentType":"application/json"}})
      .then(res=> {this.showAlert(res.data);this.$nuxt.refresh()})
      .catch(err=>this.showAlert(err.response.data))
    },
    showAlert(data){
      this.alertMessage = data.message
      this.alertSuccess = data.success
      this.alertTitle = data.success === 1 ? 'Successful':'Error'
      this.alertOpen = true
      setTimeout(()=>{
        this.alertOpen = false
      },2000)
    }
  },
  mounted(){
    axios.defaults.baseURL = 'http://localhost:4400'
  }
}
</script>