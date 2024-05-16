import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <ForgotPasswordForm />
    </>
  );
};

export default Page;
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
