import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <LazyLoadImage
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image}
      />
    </Box>
  );
};

export default UserImage;
