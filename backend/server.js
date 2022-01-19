import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cloudinaryFramework from "cloudinary";
import multer from "multer";
import cloudinaryStorage from "multer-storage-cloudinary";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { runInNewContext } from "vm";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalProject";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = Promise;

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

dotenv.config();

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

// model for activities
const SightSeeingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    enum: ["Sweden", "Norway", "Denmark"],
  },
  imageUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Number,
    default: Date.now,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 800,
    minlength: 5,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["food", "culture", "activity"],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // likes : { type: Number, default: 0 },
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (v) => {
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const result = re.test(v);
        return result;
      },
      message: "Please fill a valid email address",
    },
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const Sightseeing = mongoose.model("Sightseeing", SightSeeingSchema);
const User = mongoose.model("User", UserSchema);
// const UserStories = mongoose.model("UserStories", UserStoriesSchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");
  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      req.user = user;
      next();
    } else {
      res
        .status(401)
        .json({ response: "User not found, please login", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/stories", authenticateUser);
app.post("/stories", parser.single("image"), async (req, res) => {
  const { name, description, location, link, category, rating, country } =
    req.body;
  // const { imageUrl } = req.file.path;
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
      user: req.user._id,
      username: req.user.username,
    }).save();
    res.status(201).json({
      response: story,
      success: true,
    });
  } catch (error) {
    res.status(400).json({ errors: error.errors, success: false });
  }
});

// app.post("/stories/:storyId/like", async (req, res) => {
//   const { storyId } = req.params;
//   try {
//     const addLike = await Sightseeing.findByIdAndUpdate(
//       storyId,
//       {
//         $inc: {
//           likes: 1,
//         },
//       },
//       { new: true }
//     );
//     if (addLike) {
//       res.status(200).json({ response: addLike, success: true });
//     } else {
//       res.status(404).json({ response: "invalid id", success: false });
//     }
//   } catch (error) {
//     res.status(400).json({
//       response: "can´t find a story with this id",
//       errors: error.error,
//       success: false,
//     });
//   }
// });

app.get("/users/:id/mystories", async (req, res) => {
  const userFound = await User.findById(req.params.id);
  console.log(userFound);
  if (userFound) {
    const stories = await Sightseeing.find({
      user: mongoose.Types.ObjectId(userFound._id),
    });
    res.json({
      User: userFound.username,
      Stories: stories,
    });
  } else {
    res.status(404).json({ error: "User not found." });
  }
});
app.get("/stories", async (req, res) => {
  const { name, description, category, country } = req.query;

  try {
    const story = await Sightseeing.find({
      $or: [
        { name: { $regex: name, $options: "i" } },
        { description: { $regex: description, $options: "i" } },
        { category: { $regex: category, $options: "i" } },
        { country: { $regex: country, $options: "i" } },
      ],
    });

    res.status(200).json({ response: story, success: true });
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

app.get("stories/search", async (req, res) => {
  try {
    let question = await Sightseeing.find(req.query);
    if (question) {
      res.status(200).json({ response: question, success: true });
    } else {
      res.status(404).json({ response: "Nothing was found", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

app.get("/stories/:id/story", async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Sightseeing.findById(id);
    if (story) {
      res.status(200).json({ response: story, success: true });
    } else {
      res.status(404).json({ response: "Not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

app.get("/country/:country", async (req, res) => {
  const { country } = req.params;
  const chosenCountry = await Sightseeing.find({
    country: { $regex: country, $options: "i" },
  });
  if (chosenCountry.length === 0) {
    res.status(404).json({
      response: "Sorry, there is no country with this name",
      success: false,
    });
  } else {
    res.status(200).json({ response: thoughts, success: true });
  }
});

app.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const choosenCategory = await Sightseeing.find({
      category: { $regex: category, $options: "i" },
    });
    if (choosenCategory.length === 0) {
      res.status(404).json({
        response: `Sorry, there is no such category`,
        success: false,
      });
    } else {
      res.status(200).json({ response: choosenCategory, success: true });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        accessToken: newUser.accessToken,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
});

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

app.delete("/stories/:id", authenticateUser);
app.delete("/stories/:id", async (req, res) => {
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

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
