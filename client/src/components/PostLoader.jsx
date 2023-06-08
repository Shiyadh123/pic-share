import React from "react";
import ContentLoader from "react-content-loader";
import { useTheme } from "@mui/material";

const PostLoader = (props) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  return (
    <ContentLoader
      speed={2}
      width={480}
      height={460}
      viewBox="0 0 480 460"
      backgroundColor={main}
      foregroundColor={dark}
      {...props}
    >
      <circle cx="55" cy="31" r="30" />
      <rect x="94" y="15" rx="2" ry="2" width="120" height="15" />
      <rect x="94" y="36" rx="2" ry="2" width="100" height="10" />
      <rect x="5" y="65" rx="2" ry="2" width="480" height="400" />
    </ContentLoader>
  );
};

export default PostLoader;
