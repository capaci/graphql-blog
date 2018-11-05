<template>
  <nav class="nav-bar">
    <ul class="menu">
      <li class="menu__item"><router-link :to="{name: 'home'}">home</router-link></li>
      <li class="menu__item"><router-link :to="{name: 'about'}">about</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-bar {
  background-color: #42b983;
}

.menu {
  list-style-type: none;
  padding: 30px 0 10px;
  margin: 0;
}

.menu__item {
  display: inline-block;
  margin: 0 10px;
}

.menu__item:hover {
  text-decoration: underline;
  margin: 0 10px;
}

a,
a:visited,
a:focus {
  text-transform: uppercase;
  color: #fff;
  text-decoration: none;
}

</style>
