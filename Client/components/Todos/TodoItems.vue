<template>
  <div
    class="flex flex-col p-3"
    :class="{ 'bg-indigo-100': !isDone, 'bg-green-100': isDone }"
  >
    <base-alert v-if="alertOpen" :success="alertSuccess" :title="alertTitle">{{
      alertMessage
    }}</base-alert>
    <div class="flex items-center justify-between p-2">
      <div
        @click="thisIsDone(id)"
        class="flex items-center space-x-5 cursor-pointer -z-1000"
      >
        <div class="relative">
          <svg width="19" height="19" viewBox="0 0 19 19">
            <path
              d="M16.8889 0H2.11111C0.95 0 0 0.95 0 2.11111V16.8889C0 18.05 0.95 19 2.11111 19H16.8889C18.05 19 19 18.05 19 16.8889V2.11111C19 0.95 18.05 0 16.8889 0ZM16.8889 16.8889H2.11111V2.11111H16.8889V16.8889Z"
              :fill="isDone ? '#00745D' : '#6C5CE7'"
            />
          </svg>
          <svg
            v-if="isDone"
            class="absolute left-0.5 top-1.5"
            width="19"
            height="12"
            viewBox="0 0 26 19"
            fill="none"
          >
            <path
              d="M23.995 0.000434763C23.7352 0.0081759 23.4886 0.116755 23.3075 0.303169L8.01449 15.5961L1.72152 9.30317C1.62937 9.2072 1.51901 9.13057 1.39688 9.07779C1.27475 9.025 1.14332 8.99712 1.01027 8.99576C0.877234 8.99441 0.745261 9.01962 0.622083 9.06991C0.498906 9.12019 0.387001 9.19456 0.292923 9.28863C0.198844 9.38271 0.124482 9.49462 0.0741933 9.61779C0.0239041 9.74097 -0.00130181 9.87295 5.17615e-05 10.006C0.00140533 10.139 0.0292912 10.2705 0.0820761 10.3926C0.134861 10.5147 0.211484 10.6251 0.307457 10.7172L7.30746 17.7172C7.495 17.9047 7.74932 18.01 8.01449 18.01C8.27966 18.01 8.53398 17.9047 8.72152 17.7172L24.7215 1.71723C24.866 1.57677 24.9647 1.39593 25.0047 1.19841C25.0446 1.00089 25.024 0.795905 24.9455 0.610319C24.8669 0.424733 24.7341 0.267204 24.5645 0.158375C24.3949 0.0495457 24.1964 -0.0055056 23.995 0.000434763V0.000434763Z"
              fill="#00745D"
            />
          </svg>
        </div>
        <p
          class="text-2xl font-semibold"
          :class="{
            'text-gray-600': !isDone,
            'text-green-600': isDone,
            'line-through': isDone,
          }"
        >
          {{ topic }}
        </p>
      </div>
      <div>
        <svg
          @click="deleteTodo(id)"
          class="cursor-pointer"
          width="21"
          height="24"
          viewBox="0 0 21 24"
        >
          <path
            d="M9.99862 0.000121978C9.73374 0.00426239 9.48133 0.113322 9.29678 0.303366C9.11223 0.49341 9.01061 0.748911 9.01424 1.01379V1.51379H3.51424C3.38178 1.512 3.25028 1.53653 3.12738 1.58598C3.00447 1.63543 2.89262 1.7088 2.79831 1.80184C2.704 1.89488 2.62912 2.00572 2.578 2.12794C2.52689 2.25016 2.50057 2.38132 2.50057 2.51379H1.01424C0.881731 2.51192 0.750168 2.5364 0.6272 2.58581C0.504231 2.63523 0.39231 2.70859 0.297941 2.80163C0.203571 2.89468 0.128635 3.00555 0.077487 3.12781C0.0263393 3.25007 0 3.38127 0 3.51379C0 3.64632 0.0263393 3.77752 0.077487 3.89978C0.128635 4.02204 0.203571 4.13291 0.297941 4.22595C0.39231 4.319 0.504231 4.39236 0.6272 4.44177C0.750168 4.49119 0.881731 4.51567 1.01424 4.51379H19.0142C19.1468 4.51567 19.2783 4.49119 19.4013 4.44177C19.5243 4.39236 19.6362 4.319 19.7305 4.22595C19.8249 4.13291 19.8999 4.02204 19.951 3.89978C20.0021 3.77752 20.0285 3.64632 20.0285 3.51379C20.0285 3.38127 20.0021 3.25007 19.951 3.12781C19.8999 3.00555 19.8249 2.89468 19.7305 2.80163C19.6362 2.70859 19.5243 2.63523 19.4013 2.58581C19.2783 2.5364 19.1468 2.51192 19.0142 2.51379H17.5279C17.5279 2.38132 17.5016 2.25016 17.4505 2.12794C17.3994 2.00572 17.3245 1.89488 17.2302 1.80184C17.1359 1.7088 17.024 1.63543 16.9011 1.58598C16.7782 1.53653 16.6467 1.512 16.5142 1.51379H11.0142V1.01379C11.0161 0.880004 10.991 0.747208 10.9406 0.623267C10.8902 0.499327 10.8154 0.386763 10.7207 0.292242C10.626 0.197721 10.5133 0.123164 10.3893 0.072987C10.2652 0.0228097 10.1324 -0.00196763 9.99862 0.000121978ZM1.01424 6.51379L2.80721 21.7482C2.92521 22.7552 3.77759 23.5138 4.79159 23.5138H15.2369C16.2509 23.5138 17.1023 22.7552 17.2213 21.7482L19.0142 6.51379H1.01424Z"
            fill="#D63031"
          />
        </svg>
      </div>
    </div>
    <div>
      <p
        class="p-5 text-xl font-light"
        :class="{
          'text-gray-600': !isDone,
          'text-green-600': isDone,
          'line-through': isDone,
        }"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
import BaseAlert from "~/components/UI/BaseAlert";
import axios from "axios";
export default {
  components: { BaseAlert },
  props: ["isDone", "topic", "description", "id"],
  emits: ["done", "delete", "fresh-todos"],
  data() {
    return {
      alertOpen: false,
      alertMessage: "",
      alertTitle: "",
      alertSuccess: null,
    };
  },
  methods: {
    thisIsDone(id) {
      axios
        .get("/done", { params: { id } })
        .then((res) => {
          this.showAlert(res.data);
          this.$emit("done", res.data.todos);
        })
        .catch((err) => this.showAlert(err.response.data));
    },
    deleteTodo(id) {
      axios
        .get("/delete", { params: { id } })
        .then((res) => {
          this.showAlert(res.data);
          this.$emit("delete", res.data.todos);
        })
        .catch((err) => this.showAlert(err.response.data));
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
  },
  created() {
    // axios.defaults.baseURL = "http://localhost:4400";
  },
};
</script>
<style scoped></style>
