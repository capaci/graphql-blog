const fs = require('fs')
const path = require('path')
const { ApolloServer, gql } = require('apollo-server')

const mongoose = require('mongoose')
const resolvers = require('./resolvers')
require('dotenv').config()

const filePath = path.join(__dirname, 'typeDefs.gql')
const typeDefs = fs.readFileSync(filePath, 'utf-8')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(() => console.log('db connected'))
.catch(err => console.error(err))

const Post = require('./models/Post')
const User = require('./models/User')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
})

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`)
})
