module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      // return await Post.find({published: true})
      return await Post.find({}).sort({ createdAt: 'desc' }).populate('author', 'username name lastname avatar').lean()
    },
    getPost: async (_, { slug }, { Post }) => {
      let post = await Post.findOne({ slug }).populate('author', 'username name lastname avatar').lean()
      console.log({ post })
      return post
    }
  },
  Mutation: {
    createPost: async (_, { title, summary, content, imageUrl, categories, author, published }, { Post }) => {
      return await new Post({ title, summary, content, imageUrl, categories, author, published }).save()
    }
  }
}