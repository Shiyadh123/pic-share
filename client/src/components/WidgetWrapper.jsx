import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1rem 0.8rem 0.6rem 0.8rem",
  backgroundColor: theme.palette.background.alt,
  borderRadius: "0.65rem",
}));

export default WidgetWrapper;
