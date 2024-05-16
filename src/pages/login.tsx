import LoginForm from "@/components/forms/LoginForm";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginForm />
    </>
  );
};

export default Login;
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession(context);
//   const token = session?.access_token;
//   if (token) {
//     // if user is authenticated redirect the user
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// }
