import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comment: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
      default: "",
    },
    userImage: {
      type: String,
      default: "",
    },
    userImage: String,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
