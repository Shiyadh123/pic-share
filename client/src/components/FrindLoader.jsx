import React from "react";
import ContentLoader from "react-content-loader";
import { useTheme } from "@mui/material";

const FriendLoader = (props) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={65}
      viewBox="0 0 250 65"
      backgroundColor={main}
      foregroundColor={dark}
      {...props}
    >
      <circle cx="55" cy="31" r="30" />
      <rect x="94" y="15" rx="2" ry="2" width="120" height="15" />
      <rect x="94" y="36" rx="2" ry="2" width="100" height="10" />
    </ContentLoader>
  );
};

export default FriendLoader;
