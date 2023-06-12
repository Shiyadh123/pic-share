import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import { IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/flexBetween";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPostAfterDelete, setPostAfterLike } from "../../state";
import { LazyLoadImage } from "react-lazy-load-image-component";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  likes,
  isProfile,
  image,
  userImage,
  createdAt,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes ? likes[loggedInUserId] : false);
  const likeCount = likes ? Object.keys(likes).length : 0;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_KEY}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPostAfterLike({ post: updatedPost }));
  };

  const handleDeletePost = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_KEY}/posts/${postId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const deletedPostId = await response.json();
    dispatch(setPostAfterDelete({ deletedPostId }));
  };

  return (
    <WidgetWrapper m="0.5rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        isProfile={isProfile}
        image={userImage}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {image && (
        <LazyLoadImage
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={image}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.2rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.2rem">
            <IconButton>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{0}</Typography>
          </FlexBetween>
          {postUserId === loggedInUserId && (
            <FlexBetween gap="0.2rem">
              <IconButton onClick={handleDeletePost}>
                <DeleteOutlineOutlined />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>
        <IconButton>
          <Typography fontSize="11px">
            {timeSince(new Date(createdAt))} ago{" "}
          </Typography>
        </IconButton>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default PostWidget;
