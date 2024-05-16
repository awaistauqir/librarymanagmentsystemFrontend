import { ASSETS_RETURN } from "@/api";
import BookReturn from "@/components/assetIssuance/BookReturn";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { AssetReturn } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  returnAsset: AssetReturn;
}
const Page = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Book Issuance</title>
      </Head>
      <BookReturn returnAsset={props.returnAsset} />
    </Layout>
  );
};

export default Page;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const axiosAuth = axiosWithAuth(session.access_token);
  try {
    const response = await axiosAuth.get(
      `${ASSETS_RETURN}/${context.params?.id}`
    );

    return {
      props: {
        returnAsset: response.data,
      },
    };
  } catch (e) {}
  return {
    props: {},
  };
}
