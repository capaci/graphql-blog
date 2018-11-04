const mongoose = require('mongoose')
const slugify = require('slugify')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  content: {
    type: String
  },
  imageUrl: { type: String },
  categories: {
    type: [String],
    required: true
  },
  published: {
    type: Boolean,
    default: false,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
},
  { timestamps: true })

PostSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g })
  next()
})

module.exports = mongoose.model('Post', PostSchema)
