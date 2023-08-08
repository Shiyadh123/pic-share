import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  deletePosts,
  createPost,
  commentPost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// Update
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

//delete
router.delete("/:id", verifyToken, deletePosts);

export default router;
