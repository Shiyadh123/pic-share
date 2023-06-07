import { Box, Divider, Typography, useTheme } from "@mui/material";
import Friend from "../../components/Friend";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setUserFriends } from "../../state";

const FriendListWidget = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) =>
    isProfile ? state.friends : state.user.friends
  );

  const getFriends = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_KEY}/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    if (isProfile) {
      dispatch(setFriends({ friends: data }));
    } else {
      dispatch(setUserFriends({ friends: data }));
    }
  };

  useEffect(() => {
    getFriends();
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.2rem" }}
      >
        Friends List
        <Divider></Divider>
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends && friends.length === 0 ? (
          <Typography variant="h5" ml="10px">
            {isProfile ? "No Friends" : "Start adding friends from your feed"}
          </Typography>
        ) : (
          friends.map((friend) => (
            <Friend
              key={friend._id}
              isProfile={isProfile}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
