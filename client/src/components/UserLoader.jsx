import React from "react";
import ContentLoader from "react-content-loader";
import { useTheme } from "@mui/material";

const UserLoader = (props) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const dark = palette.neutral.dark;
  return (
    <ContentLoader
      speed={2}
      width={150}
      height={300}
      viewBox="0 0 150 300"
      backgroundColor={main}
      foregroundColor={dark}
      {...props}
    >
      <circle cx="55" cy="31" r="30" />
      <rect x="94" y="15" rx="2" ry="2" width="120" height="15" />
      <rect x="94" y="36" rx="2" ry="2" width="100" height="10" />
      <circle cx="55" cy="85" r="10" />
      <rect x="82" y="81" rx="2" ry="2" width="120" height="8" />
      <circle cx="55" cy="115" r="10" />
      <rect x="82" y="111" rx="2" ry="2" width="120" height="8" />
      <circle cx="55" cy="175" r="13" />
      <rect x="82" y="171" rx="2" ry="2" width="150" height="9" />
    </ContentLoader>
  );
};

export default UserLoader;
