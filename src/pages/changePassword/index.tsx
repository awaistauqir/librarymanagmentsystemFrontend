import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import Layout from "@/components/ui/Layout";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>Change Password</title>
      </Head>
      <Layout>
        <div className="flex items-center justify-center min-h-[77vh]">
          <ChangePasswordForm />
        </div>
      </Layout>
    </>
  );
};

export default Page;
export async function getServerSideProps() {
  // Fetch data from an API or perform other server-side tasks
  // This data will be available as props in your component
  return {
    props: {}, // Add any data you want to pass to the component here
  };
}
