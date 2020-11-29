<template>
  <div id="app">
 
    <DataTable/>

  </div>
</template>

<script>
import DataTable from './components/DataTable.vue'

export default {
  name: 'App',
  components: {
    DataTable
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
