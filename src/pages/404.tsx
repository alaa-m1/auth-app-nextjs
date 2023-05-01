import { Box, Typography,Link } from "@mui/material";
import {default as NextLink}  from "next/link";
import { ColoredDevider } from "../components";
const NotFoundPage = () => {
  return (
    <Box
      sx={{
        margin: "40px auto auto",
        maxWidth: "600px",
        boxShadow: "5px 5px 10px #ccc",
        ":hover": { boxShadow: "10px 10px 20px #ccc" },
        textAlign: "center",
        paddingBottom: "10px",
      }}
    >
        <Typography variant="h2" color="initial">404</Typography>
        <Typography variant="h4" color="initial">PAGE NOT FOUND</Typography>
        <ColoredDevider/>
        <Link component={NextLink} href='/' sx={{textDecoration:'none'}}>Main Page</Link>
    </Box>
  );
};
export default NotFoundPage;
