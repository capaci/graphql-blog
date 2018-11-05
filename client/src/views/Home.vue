<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <PostsList />
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from '@/components/PostsList.vue'

export default {
  name: 'home',
  components: {
    PostsList
  }
}
</script>
