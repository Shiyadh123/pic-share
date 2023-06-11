import React from "react";
import NavBar from "../navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidgets";
import FriendListWidget from "../widgets/FrindsListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, image } = useSelector((state) => state.user);
  return (
    <Box>
      <NavBar></NavBar>
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            <UserWidget userId={_id} image={image} isProfile={false} />
          </Box>
        )}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          <MyPostWidget userImage={image} />
          <PostsWidget userId={_id} isProfile={false}></PostsWidget>
        </Box>

        <Box flexBasis="26%">
          <Box m="0.1rem 0" />
          <FriendListWidget userId={_id} isProfile={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
