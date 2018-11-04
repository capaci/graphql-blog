const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  }
}, {
    timestamps: true
  })

/* before saving an user, converts the password to hash */
UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
  }
  next()
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
