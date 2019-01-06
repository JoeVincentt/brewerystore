import React from "react";
import { BounceLoader } from "react-spinners";
import { Box } from "gestalt";

const Loader = () => (
  <Box
    position="fixed"
    dangerouslySetInlineStyle={{
      __style: {
        bottom: 300,
        left: "50%",
        transform: "translateX(-50%)"
      }
    }}
  >
    <BounceLoader color="#CCDCE0" size={100} margin="3px" />
  </Box>
);

export default Loader;
