import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/finalProject";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    next();
  } else {
    res.status(503).json({
      error: "Connection problems",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    endpoints: listEndpoints(app),
  });
});

const stories = require("./controllers/stories");
const users = require("./controllers/users");

app.use("/stories", stories);
app.use("/users", users);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
