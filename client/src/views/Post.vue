<template>
  <div class="about" v-if="getPost">
    <h1>This is a Post page ({{getPost.title}})</h1>
    <p>{{getPost.content}}</p>
    <div class="author">
      Por <strong>{{`${getPost.author.name} ${getPost.author.lastname}`}}</strong>
    </div>

  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Post',
  data: () => {
    return {
      getPost: null
    }
  },
  apollo: {
    getPost: {
      query: gql`query GetPost($slug: String!){
        getPost (slug: $slug) {
          title
          slug
          content
          published
          author {
            username
            name
            lastname
            avatar
          }
        }
      }`,
      variables () {
        return {
          slug: this.$route.params.slug
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  text-align: justify;
}
.author {
  text-align: right;
}
</style>
