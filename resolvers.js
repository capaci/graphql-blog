module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      // return await Post.find({published: true})
      return await Post.find({}).sort({createdAt: 'desc'}).populate('author', 'username name lastname avatar').lean()
    }
  },
  Mutation: {
    createPost: async (_, { title, content, imageUrl, categories, author, published }, { Post }) => {
      return await new Post({ title, content, imageUrl, categories, author, published }).save()
    }
  }
}