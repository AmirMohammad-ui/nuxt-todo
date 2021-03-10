<template>
  <div class="fixed z-50 text-xl transform -translate-x-1/2 top-10 left-1/2">
    <header v-if="success===0" class="p-3 px-4 text-white bg-red-700 shadow-lg">{{title}}</header>
    <header v-else-if="success===1" class="p-3 px-6 text-white bg-green-600 shadow-lg">{{title}}</header>
    <header v-else class="p-3 text-gray-700 bg-gray-100 shadow-lg">{{title}}</header>
    <div class="p-7 bg-gray-50">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {title:{type:String,required:true},success:{type:Number,default: 0}}
}
</script>
