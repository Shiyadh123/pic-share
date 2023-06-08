import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  token: null,
  friends: [],
  posts: [],
  filteredPosts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.friends = action.payload.user.friends;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.friends = action.payload.friends;
      } else {
        console.log("user non-existent");
      }
    },
    setUserFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user non-existent");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
      state.filteredPosts = action.payload.posts;
    },
    setfilteredPosts: (state, action) => {
      state.filteredPosts = action.payload.posts;
    },
    setPostAfterLike: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
      state.filteredPosts = updatedPosts;
    },
    setPostAfterDelete: (state, action) => {
      const updatedPosts = state.posts.filter((post) => {
        return post._id !== action.payload.deletedPostId._id;
      });
      state.posts = updatedPosts;
      state.filteredPosts = updatedPosts;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setUserFriends,
  setPostAfterDelete,
  setPostAfterLike,
  setPosts,
  setfilteredPosts,
} = authSlice.actions;
export default authSlice.reducer;
