<template>
  <div class="fixed top-0 left-0 w-full h-full">
    <div @click="$emit('close-modal',$event)" class="fixed w-full h-full bg-gray-900 opacity-70"></div>
    <dialog open class="fixed w-3/4 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <header class="p-3">New Todo</header>
      <div class="p-5">
        <slot></slot>
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  mounted(){
    document.body.appendChild(this.$el)
  }
};

</script>

<style scoped>
  
  header {
    font-size: 2rem;
    background: rgba(71, 0, 151, 0.404);
    color: indigo;
    border-bottom: 1px solid #cdcdcd;
  }
</style>
