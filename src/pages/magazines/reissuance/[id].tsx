import { ASSETS_REISSUANCE } from "@/api";
import MagazineReissuance from "@/components/assetIssuance/MagazineReissuance";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { BorrowedItem, IssuedUser, IssuingAsset } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  borrowedItem: BorrowedItem;
}
const Page = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Magazine Reissuance</title>
      </Head>
      <MagazineReissuance borrowedItem={props.borrowedItem} />
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
      `${ASSETS_REISSUANCE}/${context.params?.id}`
    );

    return {
      props: {
        borrowedItem: response.data,
      },
    };
  } catch (e) {}
  return {
    props: {},
  };
}
