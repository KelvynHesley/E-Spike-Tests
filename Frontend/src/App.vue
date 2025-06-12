<template>
<div align="center">
    <router-link to="/"></router-link>
    <router-view/>
      </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  background-color: #ffffff;
}

nav {
  padding: 10px;
  background-color: #ffffff;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #ffffff;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
