import { Inter } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession();
  console.log('session data=',session)
  return (
    <main style={{ height: "100vh"}}>
      <Box display="flex" justifyContent="flex-start" m={2}>
        {session ? (
          <>
            <Box component="span" margin={"0px 15px 0px 5px"}>Signed in as {session?.user?.email}:</Box>
            <Button variant="contained" color="primary" onClick={() => signOut()}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Box component="span" margin={"0px 15px 0px 5px"}>Not signed in </Box>
            <Button variant="contained" color="primary" onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}
      </Box>{" "}
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log('server session=',session)
  return {
    props: {
      session,
  }
}
}
