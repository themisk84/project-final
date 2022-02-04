import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import cloudinaryStorage from "multer-storage-cloudinary";
// import crypto from 'crypto' // Moved to user model
import bcrypt from "bcrypt";
import { runInNewContext } from "vm";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalProject";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:

//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

dotenv.config();

// Image upload storage

const cloudinary = cloudinaryFramework.v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = cloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const parser = multer({ storage });

// Models

// Import of models
const Sightseeing = require("./models/sightseeing");
const User = require("./models/user");
const Comment = require("./models/comment");

// Middlewares

app.use(cors());
app.use(express.json());

// Authorization
// Auth now happens just before async (eg. POST '/stories' below)
const authenticateUser = require("./auth/auth");

// Endpoints

// app.get('/', (req, res) => {
//   res.json({
//     endpoints: listEndpoints(app),
//   })
// })

// POST: SIGHTSEEING
app.post(
  "/stories",
  parser.single("image"),
  authenticateUser,
  async (req, res) => {
    const { name, description, location, link, category, rating, country } =
      req.body;
    // const { imageUrl } = req.file.path;
    const queredUser = await User.findById(req.user._id);
    try {
      const story = await new Sightseeing({
        name,
        description,
        imageUrl: req.file.path,
        location,
        country,
        link,
        category,
        rating,
        user: queredUser,
      }).save();
      story.populate("user");
      res.status(201).json({
        response: story,
        success: true,
      });
    } catch (error) {
      res.status(400).json({ errors: error.errors, success: false });
    }
  }
);

// GET: SEARCHBAR FILTERING
app.get("/stories", async (req, res) => {
  const { name, description, category, country } = req.query;
  let story = await Sightseeing.find().populate([
    { path: "user", model: "User", select: "username" },
    {
      path: "comments",
      model: "Comment",
      populate: [
        { path: "sightseeing", model: "Sightseeing", select: "name" },
        { path: "user", model: "User", select: "username" },
      ],
    },
  ]);
  if (name || description || category || country) {
    story = await Sightseeing.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { description: { $regex: description, $options: "i" } },
        { category: { $regex: category, $options: "i" } },
        { country: { $regex: country, $options: "i" } },
      ],
    });
  }
  res.status(200).json({ response: story, success: true });
});

// POST: LIKE
app.post("/stories/:storyId/like", async (req, res) => {
  const { storyId } = req.params;
  try {
    const addLike = await Sightseeing.findByIdAndUpdate(
      storyId,
      {
        $inc: {
          likes: 1,
        },
      },
      { new: true }
    );
    if (addLike) {
      res.status(200).json({ response: addLike, success: true });
    } else {
      res.status(404).json({ response: "invalid id", success: false });
    }
  } catch (error) {
    res.status(400).json({
      response: "can't find a story with this id",
      errors: error.error,
      success: false,
    });
  }
});

// POST: COMMENT
app.post("/stories/:storyId/comment", authenticateUser, async (req, res) => {
  const { storyId } = req.params;
  const { message } = req.body;
  try {
    const comment = await new Comment({
      message,
      user: req.user._id,
    }).save();

    const postRelated = await Sightseeing.findByIdAndUpdate(
      storyId,
      {
        $push: {
          comments: comment,
        },
      },
      { new: true }
    ).populate({
      path: "comments",
      model: "Comment",
      populate: { path: "user", model: "User", select: "username" },
    });

    if (postRelated) {
      res.status(200).json({ response: postRelated, success: true }); // response: comment
    } else {
      res.status(404).json({ response: "post not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ errors: error, success: false });
  }
});

// POST: SIGNUP
app.post("/signup", async (req, res) => {
  const { username, password, email, avatar } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
      avatar,
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        accessToken: newUser.accessToken,
        avatar: newUser.avatar,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

// POST: SIGNIN
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
          avatar: user.avatar,
          email: user.email,
        },
        success: true,
      });
    } else {
      res.status(404).json({
        response: "Username or password doesn't match",
        success: false,
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

// DELETE: SIGHTSEEING
app.delete("/stories/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;
  const stories = await Sightseeing.find({ user: req.user._id });
  if (stories) {
    const deletedStory = await Sightseeing.findOneAndDelete({ _id: id });
    res.status(200).json({
      response: deletedStory,
      success: true,
    });
  } else {
    res.status(404).json({ response: "Story not found", success: false });
  }
});

app.delete(
  "/stories/:storyId/comments/:commentId",
  authenticateUser,
  async (req, res) => {
    const { commentId, storyId } = req.params;
    console.log(commentId);
    console.log(storyId);
    try {
      const oneComment = await Comment.findById(commentId);
      const commentRelated = await Sightseeing.findByIdAndUpdate(
        storyId,
        {
          $unset: {
            comments: oneComment,
          },
        },
        { new: true }
      ).populate({
        path: "comments",
        model: "Comment",
        populate: { path: "user", model: "User", select: "username" },
      });
      if (oneComment) {
        res.status(200).json({ response: commentRelated, success: true }); // response: comment
      } else {
        res.status(404).json({ response: "Comment not found", success: false });
      }
    } catch (error) {
      res.status(400).json({ errors: error, success: false });
    }
  }
);

// app.get('/users/:id/mystories', async (req, res) => {
//   // const userFound = await User.findById(req.params.id);

//   const stories = await Sightseeing.find({
//     user: req.params.id,
//   }).populate('user')
//   // ---------------QUESTION-------------
//   // .populate('comments').populate('user')
//   // ---------------QUESTION-------------
//   res.json({
//     Stories: stories,
//   })
// })

// try {
//   const story = await Sightseeing.find();
//   $or: [
//     { name: { $regex: name, $options: "i" } },
//     { description: { $regex: description, $options: "i" } },
//     { category: { $regex: category, $options: "i" } },
//     { country: { $regex: country, $options: "i" } },
//   ],
//     res.status(200).json({ response: story, success: true });
// } catch (error) {
//   res.status(400).json({ error: error, success: false });
// }

//  app.get('/stories/:id', async (req, res) => {
//    const { id } = req.params

//    const story = await Sightseeing.findById(id).populate('comments')
//    res.status(200).json({ response: story, success: true })
//  })

//  app.get('/filtering', async (req, res) => {
//    try {
//      let question = await Sightseeing.find(req.query)
//      if (question) {
//        res.status(200).json({ response: question, success: true })
//      } else {
//        res.status(404).json({ response: 'Nothing was found', success: false })
//      }
//    } catch (error) {
//      res.status(400).json({ error: error, success: false })
//    }
//  })

// app.get('/stories/:id/story', async (req, res) => {
//   const { id } = req.params
//   try {
//     const story = await Sightseeing.findById(id)
//     if (story) {
//       res.status(200).json({ response: story, success: true })
//     } else {
//       res.status(404).json({ response: 'Not found', success: false })
//     }
//   } catch (error) {
//     res.status(400).json({ error: error, success: false })
//   }
// })

// app.get('/country/:country', async (req, res) => {
//   const { country } = req.params
//   const chosenCountry = await Sightseeing.find({
//     country: { $regex: country, $options: 'i' },
//   })
//   if (chosenCountry.length === 0) {
//     res.status(404).json({
//       response: 'Sorry, there is no country with this name',
//       success: false,
//     })
//   } else {
//     res.status(200).json({ response: chosenCountry, success: true })
//   }
// })

// app.get('/category/:category', async (req, res) => {
//   const { category } = req.params
//   try {
//     const choosenCategory = await Sightseeing.find({
//       category: { $regex: category, $options: 'i' },
//     })
//     if (choosenCategory.length === 0) {
//       res.status(404).json({
//         response: `Sorry, there is no such category`,
//         success: false,
//       })
//     } else {
//       res.status(200).json({ response: choosenCategory, success: true })
//     }
//   } catch (error) {
//     res.status(400).json({ error: error, success: false })
//   }
// })

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
