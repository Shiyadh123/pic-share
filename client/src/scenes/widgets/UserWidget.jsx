import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  InterestsOutlined,
  PhotoLibrary,
  Email,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, Button } from "@mui/material";
import UserImage from "../../components/UserImage";
import FlexBetween from "../../components/flexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserLoader from "../../components/UserLoader";

const UserWidget = ({ userId, picturePath, isProfile }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setIsLoading(false);
      setUser(data);
    } catch (error) {
      console.log("err", error);
    }
  };

  let userFriendsFromStore = useSelector((state) => state.user.friends);

  useEffect(() => {
    getUser();
  }, [userFriendsFromStore]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }
  const { firstName, lastName, location, interests, email, friends } = user;

  return isLoading ? (
    <UserLoader></UserLoader>
  ) : (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              {friends.length} friend{friends.length === 1 ? "" : "s"}
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <InterestsOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{interests}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          {!isProfile ? "Your" : ""} Account
        </Typography>

        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <Email fontSize="large" sx={{ color: main }}></Email>
            <Box>
              <Typography color={main} fontWeight="500">
                Email
              </Typography>
              <Typography color={medium}>{email}</Typography>
            </Box>
          </FlexBetween>
          <EditOutlined sx={{ color: main }} />
        </FlexBetween>
      </Box>
      <Divider />

      {/* FOURTH ROW */}
      {!isProfile && (
        <Box
          p="1rem "
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* <FlexBetween gap="1rem"> */}
          <Button ml="30px" onClick={() => navigate(`/profile/${userId}`)}>
            <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
              <PhotoLibrary fontSize="large" sx={{ color: main }} />
              <Typography fontWeight="500">My Posts</Typography>
            </Box>
          </Button>
          {/* </FlexBetween> */}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default UserWidget;
