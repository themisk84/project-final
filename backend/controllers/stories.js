const express = require('express')

const Sightseeing = require('../models/sightseeing')
const User = require('../models/user')
const Comment = require('../models/comment')
const authenticateUser = require('../auth/auth')
// const storage = require('../utils/storage')
const storage = require('../utils/imageUpload')

import multer from 'multer'

const storyRouter = express.Router()

const parser = multer({ storage })

storyRouter.get('/', async (req, res) => {
  const { name, description, category, country, location } = req.query //added location
  let story = await Sightseeing.find().populate([
    { path: 'user', model: 'User', select: 'username' },
    {
      path: 'comments',
      model: 'Comment',
      populate: [
        { path: 'sightseeing', model: 'Sightseeing', select: 'name' },
        { path: 'user', model: 'User' },
      ],
    },
  ])
  if (name || description || category || country || location) {
    //added location
    story = await Sightseeing.find({
      $or: [
        { name: { $regex: name, $options: 'i' } },
        { description: { $regex: description, $options: 'i' } },
        { category: { $regex: category, $options: 'i' } },
        { country: { $regex: country, $options: 'i' } },
        { location: { $regex: location, $options: 'i' } }, //added location
      ],
    })
  }
  res.status(200).json({ response: story, success: true })
})

storyRouter.post(
  '/',
  parser.single('image'),
  authenticateUser,
  async (req, res) => {
    const {
      name,
      description,
      lng,
      lat,
      location,
      link,
      category,
      rating,
      country,
    } = req.body
    // const { imageUrl } = req.file.path;
    const queriedUser = await User.findById(req.user._id)
    try {
      const story = await new Sightseeing({
        name,
        description,
        imageUrl: req.file.path,
        lng,
        lat,
        location,
        country,
        link,
        category,
        rating,
        user: queriedUser,
      }).save()
      story.populate('user')
      res.status(201).json({
        response: story,
        success: true,
      })
    } catch (error) {
      res.status(400).json({ errors: error.errors, success: false })
    }
  },
)

storyRouter.delete('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params
  const stories = await Sightseeing.find({ user: req.user._id })
  if (stories) {
    const deletedStory = await Sightseeing.findOneAndDelete({ _id: id })
    res.status(200).json({
      response: deletedStory,
      success: true,
    })
  } else {
    res.status(404).json({ response: 'Story not found', success: false })
  }
})

storyRouter.post('/:storyId/comment', authenticateUser, async (req, res) => {
  const { storyId } = req.params
  const { message } = req.body
  try {
    const comment = await new Comment({
      message,
      user: req.user._id,
    }).save()

    const postRelated = await Sightseeing.findByIdAndUpdate(
      storyId,
      {
        $push: {
          comments: comment,
        },
      },
      { new: true },
    ).populate({
      path: 'comments',
      model: 'Comment',
      populate: { path: 'user', model: 'User' },
    })

    if (postRelated) {
      res.status(200).json({ response: postRelated, success: true })
    } else {
      res.status(404).json({ response: 'post not found', success: false })
    }
  } catch (error) {
    res.status(400).json({ errors: error, success: false })
  }
})

storyRouter.delete(
  '/:storyId/comments/:commentId',
  authenticateUser,
  async (req, res) => {
    const { commentId, storyId } = req.params
    console.log(commentId)
    console.log(storyId)
    try {
      const oneComment = await Comment.findById(commentId)
      const commentRelated = await Sightseeing.findByIdAndUpdate(
        storyId,
        {
          $pull: {
            comments: commentId,
          },
        },
        { new: true },
      ).populate({
        path: 'comments',
        model: 'Comment',
        populate: { path: 'user', model: 'User' },
      })
      if (oneComment) {
        res.status(200).json({ response: commentRelated, success: true })
      } else {
        res.status(404).json({ response: 'Comment not found', success: false })
      }
    } catch (error) {
      res.status(400).json({ errors: error, success: false })
    }
  },
)

storyRouter.post('/:storyId/like', async (req, res) => {
  const { storyId } = req.params
  try {
    const addLike = await Sightseeing.findByIdAndUpdate(
      storyId,
      {
        $inc: {
          likes: 1,
        },
      },
      { new: true },
    )
    if (addLike) {
      res.status(200).json({ response: addLike, success: true })
    } else {
      res.status(404).json({ response: 'invalid id', success: false })
    }
  } catch (error) {
    res.status(400).json({
      response: "can't find a story with this id",
      errors: error.error,
      success: false,
    })
  }
})

module.exports = storyRouter
