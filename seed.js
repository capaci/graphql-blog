const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/User')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
.then(async () => {
  console.log('db connected')
    let user = new User({
      name: 'Rafael',
      lastname: 'Capaci',
      username: 'capaci',
      email: 'rafaelcapacipereira@gmail.com',
      password: 'rafael'
    })
    await user.save()
    console.log('user created')
  })
  .catch(err => console.error(err))
