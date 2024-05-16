import { ASSETS_ISSUANCE } from "@/api";
import JournalIssuance from "@/components/assetIssuance/JournalIssuance";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { IssuedUser, IssuingAsset } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  isssuing_asset: IssuingAsset;
  usersList: IssuedUser[];
}
const Page = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Journal Issuance</title>
      </Head>
      <JournalIssuance
        issuing_asset={props.isssuing_asset}
        userList={props.usersList}
      />
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
      `${ASSETS_ISSUANCE}/${context.params?.id}`
    );

    return {
      props: response.data,
    };
  } catch (e) {}
  return {
    props: {},
  };
}
