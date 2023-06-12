import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { Typography } from "@mui/material";
import PostLoader from "../../components/PostLoader";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const posts = useSelector((state) => state.filteredPosts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    setIsLoading(true);
    const response = await fetch(process.env.REACT_APP_API_KEY + "/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setIsLoading(false);
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_API_KEY}/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setIsLoading(false);
    dispatch(setPosts({ posts: data }));
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let revPosts = posts.slice().reverse();

  return (
    <>
      {isLoading ? (
        <>
          {" "}
          <PostLoader></PostLoader> <PostLoader></PostLoader>
        </>
      ) : posts.length === 0 ? (
        <Typography variant="h5" ml="10px">
          No posts to show
        </Typography>
      ) : (
        revPosts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            likes,
            comments,
            image,
            userImage,
            createdAt,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              isProfile={isProfile}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              likes={likes}
              comments={comments}
              image={image}
              userImage={userImage}
              createdAt={createdAt}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
