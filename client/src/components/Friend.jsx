import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserFriends } from "../state";
import FlexBetween from "./flexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, name, subtitle, image, isProfile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(useSelector((state) => state.token));
  const user = useSelector((state) => state.user);
  let friends = [];
  let _id = null;
  if (isAuth) {
    friends = user.friends;
    _id = user._id;
  }
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    if (!isAuth) {
      navigate(`/`);
      navigate(0);
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_KEY}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setUserFriends({ friends: data }));
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={image} size="55px" />
        <Box
          onClick={() => {
            if (!isAuth) {
              navigate(`/`);
            } else {
              navigate(`/profile/${friendId}`);
            }
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {friendId !== _id ? (
        <IconButton
          onClick={() => patchFriend()}
          sx={{ backgroundColor: primaryLight, p: "0.9rem" }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      ) : (
        <IconButton sx={{ backgroundColor: primaryLight, p: "0.8rem" }}>
          <AccountCircleOutlined
            sx={{ color: primaryDark }}
          ></AccountCircleOutlined>
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
