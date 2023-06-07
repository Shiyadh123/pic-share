import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"; //node native
import { fileURLToPath } from "url"; //to config directories
// import User from "./models/user.js";
// import Post from "./models/post.js";
// import { users, posts } from "./data/index.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

import { verifyToken } from "./middleware/auth.js";

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //make directory accessible in /assets route

// File storage
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "public/assets"); //storage location
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //same file name as uploaded form
  },
});
const upload = multer({ storage: storage });

// Routes with files
app.post("/auth/register", upload.single("picture"), register); //middleware in mid to upload file (req.file==picture)
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// Mongoose setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
