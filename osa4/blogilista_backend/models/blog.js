const mongoose = require('mongoose')

// Blogin attribuutit
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Muutetaan Mongoose-oliot käytännöllisempään muotoon
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    // Näillä tiedoilla ei tehdä sovelluksen kannalta mitään
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
