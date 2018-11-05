<template>
  <ul class="posts">
    <router-link v-for="post in getPosts" :key="post.slug" :to="{name: 'post', params: {slug: post.slug}}" tag="li" class="post">
      <h2>{{post.title}}</h2>
      <p>{{post.content}}</p>
      </router-link>
  </ul>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: 'PostsList',
  data: () => {
    return {
      getPosts: []
    }
  },
  apollo: {
    getPosts: {
      query: gql`
        query {
          getPosts {
            title
            slug
            content
          }
        }
      `
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.posts {
  max-width: 500px;
  list-style-type: none;
  padding: 30px 0 10px;
  margin: 0 auto;
}

.post {
  margin-bottom: 15px;
  padding-bottom: 10px;
  text-align: left;
}

.post:hover {
  cursor: pointer;

  h2 {
    text-decoration: underline;
  }
}

a,
a:visited,
a:focus {
  text-transform: uppercase;
  text-decoration: none;
}

</style>
