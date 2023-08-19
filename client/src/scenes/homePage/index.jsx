import React, { useDebugValue } from "react";
import NavBar from "../navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "../widgets/UserWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidgets";
import FriendListWidget from "../widgets/FrindsListWidget";
import PleaseLoginWidget from "../widgets/PleaseLoginWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const isAuth = Boolean(useSelector((state) => state.token));

  const userData = useSelector((state) => state.user);
  let _id = null,
    image = "";
  if (isAuth) {
    _id = userData._id;
    image = userData.image;
  }
  return (
    <Box>
      <NavBar></NavBar>
      <Box
        width="100%"
        padding={isNonMobileScreens ? "0.5rem 6%" : "0.5rem 1%"}
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {isNonMobileScreens && (
          <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
            {isAuth ? (
              <UserWidget userId={_id} image={image} isProfile={false} />
            ) : (
              <PleaseLoginWidget
                purpose={"see your profile"}
              ></PleaseLoginWidget>
            )}
          </Box>
        )}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "1rem"}
        >
          {isAuth && <MyPostWidget userImage={image} />}
          <PostsWidget userId={_id} isProfile={false}></PostsWidget>
        </Box>

        {
          <Box flexBasis="26%">
            <Box m="0.1rem 0" />
            {isAuth ? (
              <FriendListWidget userId={_id} isProfile={false} />
            ) : (
              <PleaseLoginWidget
                purpose={"see your friends"}
              ></PleaseLoginWidget>
            )}
          </Box>
        }
      </Box>
    </Box>
  );
};

export default HomePage;
