<template>
  <div class="nav">
    <b-nav pills>
      <b-nav-item to="home">Home</b-nav-item>
      <b-nav-item to="about">About</b-nav-item>
      <b-nav-item to="projects">Projects</b-nav-item>
      <b-nav-item-dropdown id="nav7_ddown" text="Contact" right>
        <b-dropdown-item>Github</b-dropdown-item>
        <b-dropdown-item>Linked In</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item>three</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </div>
</template>

<script>
  export default {
    name: 'Nav',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      };
    },
  };
</script>


<style scoped>

</style>
