import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  sightseeing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sightseeing',
  },
})

module.exports = mongoose.model('Comment', CommentSchema)
