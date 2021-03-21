<template>
  <div>
    <TheHeader @new-todos="updateTodos" @open-modal="openModal"/>
    <base-alert v-if="alertOpen" :success="alertSuccess" :title="alertTitle">{{
      alertMessage
    }}</base-alert>
    <base-modal @close-modal="isModalOpen = false" title="New Todo" v-if="isModalOpen">
      <div class="grid grid-cols-1 sm:grid-cols-3">
        <div class="mx-5 mb-3 sm:col-span-1">
          <base-input type="text" label="Topic" @theValueInput="inputValChanged" />
        </div>
        <div class="mx-5 mb-3 sm:col-span-2">
          <base-input type="text" label="Description" @theValueInput="inputValChanged" />
        </div>
      </div>
      <div>
        <button
          @click="RegisterNewTodo"
          class="float-right p-2 px-4 mx-5 mt-2 mb-4 text-xl font-light tracking-wider text-green-600 border border-green-600 focus:outline-none hover:bg-green-600 hover:text-green-50"
        >
          Submit
        </button>
      </div>
    </base-modal>
    <div class="mb-10">
      <div>
        <div class="max-w-3xl mx-auto">
          <ul class="text-lg capitalize">
            <li class="flex p-4 all-todos">
              all todos: <span class="text-xl font-bold">&nbsp; {{ todos.length }}</span>
            </li>
            <li class="flex p-4 done-todos">
              <span class="text-xl font-bold"
                >{{ todos.filter((t) => t.isDone !== false).length }} &nbsp;</span
              >
              todos done &nbsp;&nbsp;
              <svg width="22" height="15" viewBox="0 0 26 19">
                <path
                  d="M23.995 0.000434763C23.7352 0.0081759 23.4886 0.116755 23.3075 0.303169L8.01449 15.5961L1.72152 9.30317C1.62937 9.2072 1.51901 9.13057 1.39688 9.07779C1.27475 9.025 1.14332 8.99712 1.01027 8.99576C0.877234 8.99441 0.745261 9.01962 0.622083 9.06991C0.498906 9.12019 0.387001 9.19456 0.292923 9.28863C0.198844 9.38271 0.124482 9.49462 0.0741933 9.61779C0.0239041 9.74097 -0.00130181 9.87295 5.17615e-05 10.006C0.00140533 10.139 0.0292912 10.2705 0.0820761 10.3926C0.134861 10.5147 0.211484 10.6251 0.307457 10.7172L7.30746 17.7172C7.495 17.9047 7.74932 18.01 8.01449 18.01C8.27966 18.01 8.53398 17.9047 8.72152 17.7172L24.7215 1.71723C24.866 1.57677 24.9647 1.39593 25.0047 1.19841C25.0446 1.00089 25.024 0.795905 24.9455 0.610319C24.8669 0.424733 24.7341 0.267204 24.5645 0.158375C24.3949 0.0495457 24.1964 -0.0055056 23.995 0.000434763V0.000434763Z"
                  fill="#00745D"
                />
              </svg>
            </li>
          </ul>
        </div>
        <base-divider color="#cdcdcd" w="80%" />
        <ul class="grid grid-cols-1 sm:grid-cols-2">
          <li class="m-5" v-for="todo in todos" :key="todo._id">
            <todo-items
              @done="getTodos"
              @delete="getTodos"
              :topic="todo.topic"
              :description="todo.description"
              :id="todo._id"
              :isDone="todo.isDone"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseInput from "~/components/UI/BaseInput";
import BaseDivider from "~/components/UI/BaseDivider.vue";
import TodoItems from "~/components/Todos/TodoItems";
import BaseAlert from "~/components/UI/BaseAlert";
import TheHeader from "~/components/TheHeader";
import BaseModal from "~/components/UI/BaseModal";

export default {
  components: { TodoItems, BaseDivider, BaseInput, TheHeader, BaseModal, BaseAlert },
  data() {
    return {
      todos: [],
      errorMessage: "",
      isModalOpen: false,
      topic: "",
      description: "",
      alertOpen: false,
      alertMessage: "",
      alertTitle: "",
      alertSuccess: null,
    };
  },
  methods: {
    getTodos(todos) {
      if (todos) {
        this.todos = todos;
      } else {
        axios
          .get("/todos")
          .then((res) => {this.todos = res.data.todos})
          .catch((err) => {this.showAlert(err.response.data)});
      }
    },
    inputValChanged(e, val) {
      if (e.target.id === "Topic") {
        this.topic = val;
      } else if(e.target.id === "Description"){
        this.description = val;
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    RegisterNewTodo() {
      if (this.topic === "") {
        this.showAlert({
          success: 0,
          message: "Topic is Required.",
        });
        return;
      }
      if (this.description === "") {
        this.showAlert({
          success: 0,
          message: "Description is Required.",
        });
        return;
      }
      axios
        .post(
          "/new",
          { topic: this.topic, description: this.description },
          { headers: { ContentType: "application/json" } }
        )
        .then((res) => {
          this.showAlert(res.data);
          this.isModalOpen = !this.isModalOpen;
          this.getTodos();
        })
        .catch((err) => {
          this.showAlert(err.response.data);
          this.isModalOpen = !this.isModalOpen;
        });
    },
    showAlert(data) {
      this.alertMessage = data.message;
      this.alertSuccess = data.success;
      this.alertTitle = data.success === 1 ? "Successful" : "Error";
      this.alertOpen = true;
      setTimeout(() => {
        this.alertOpen = false;
      }, 2000);
    },
    updateTodos(todos){
      this.todos = todos
    }
  },
  mounted() {
    // axios.defaults.URL = "http://localhost:4400";
    this.getTodos();
  },
};
</script>

<style>
.done-todos {
  background: #00ffcc38;
  color: #00745d;
}
.all-todos {
  background: #f3f1ef;
}
</style>
