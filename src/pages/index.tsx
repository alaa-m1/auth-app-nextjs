import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  console.log("session data=", session);
  return (
    <main style={{ height: "100vh" }}>
      <Box display="flex" justifyContent="center" m={2}>
        {session ? (
          <>
            <Card sx={{ maxWidth: 200 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={`${session?.user?.image}`}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography variant="h6" component="div" >
                    Signed in as <Typography component="span" bgcolor={"#0ff"}> {session?.user?.email}</Typography>
                  </Typography>
                  <Typography variant="h6" component="div" >
                    <Typography component="span" bgcolor={"#ccc"}> {session?.user?.provider}</Typography>
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </>
        ) : (
          <>
            <Box component="span" margin={"0px 15px 0px 5px"}>
              Not signed in{" "}
            </Box>
            {/* <Button
              variant="contained"
              color="primary"
              onClick={() => redirect('/login')}
            >
              Login
            </Button> */}
          </>
        )}
      </Box>{" "}
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log("server session=", session);
  return {
    props: {
      session,
    },
  };
}
