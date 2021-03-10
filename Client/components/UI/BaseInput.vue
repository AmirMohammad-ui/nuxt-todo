<template>
  <div class="relative my-5">
    <input :type="type" :id="label" :placeholder="placeholder" @input="$emit('theValueInput',$event,theValue)" v-model="theValue" required>
    <span class="bar"></span>
    <span class="label">{{label}}</span>
  </div>
</template>
<script> 
export default {
  props:['label','placeholder','value','type'],
  data:()=>({
    theValue: '',
  })
}
</script>

<style scoped>
.label {
  position: absolute;
  top: 4px;
  left: 10px;
  font-size: 1.5rem;
  color: #b8b8b8;
  transition: all .3s;
  z-index: -10;
}
input {
  width: 100%;
  background: #cdcdcd7e;
  font-size: 1.5rem;
  color: #7777;
  padding: 5px 10px;
  z-index: 2;
}
.bar:after {
  position: absolute;
  bottom: -1px;
  left: 0;
  content: '';
  height: 2px;
  width: 0;
  background: #404040;
  transition: all .3s;
}
input:focus + .bar:after,input:valid + .bar:after  {
  width: 100%;
}
input:focus ~ .label,input:valid ~ .label {
  top: -15px;
  left: 2px;
  font-size: 1rem;
  color: #505050;
  z-index: 3;
}
</style>
