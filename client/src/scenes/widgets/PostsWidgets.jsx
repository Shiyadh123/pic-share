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
  // console.log(posts);

  let revPosts = posts.slice().reverse();

  return (
    <>
      {isLoading ? (
        <>
          {!isProfile && (
            <div
              style={{
                border: "1px solid red",
                borderRadius: "0.65rem",
                padding: "7px",
                margin: "2px",
              }}
            >
              <p
                style={{
                  margin: "0px",
                }}
              >
                Please bear with us, Our backend service requires a short
                spin-up time of few seconds.
              </p>
            </div>
          )}
          <PostLoader></PostLoader> <PostLoader></PostLoader>
        </>
      ) : revPosts.length === 0 ? (
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
            comment,
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
              comments={comment}
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
