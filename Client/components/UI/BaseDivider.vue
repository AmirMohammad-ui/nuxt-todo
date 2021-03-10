<template>
  <div :style="{backgroundColor: color,width: w}"></div>
</template>
<script>
export default {
  props: ['color','w'],
}
</script>
<style scoped>
  div{ 
    height: 1px;
    margin: 20px auto;
  }
</style>