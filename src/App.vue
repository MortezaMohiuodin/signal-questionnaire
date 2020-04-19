<template>
  <div id="app">
    <div class="bg-signal"></div>
    <div class="logo-container">
      <img src="./assets/images/logo.svg" alt="signal logo">
    </div>
    <h4 class="text-light mt-2 mb-5">فرم درخواست همکاری سیگنال</h4>
    <SingalForm />
  </div>
</template>

<script>
import SingalForm from './views/signalForm.vue'

export default {
  name: 'App',
  components: {
    SingalForm
  }
}
</script>

<style scoped>
#app{
    max-width: 1100px;
    margin: 0 auto;
    color: #292f33;
    margin-top: 30px;
    margin-bottom: 150px;
}
.bg-signal{
    background: url('./assets/images/background.svg');
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 345px;
    z-index: -1;
}
.logo-container{
    width: 120px;
    height: 50;
}
.logo-container img{
    width: 100%;
}
</style>
