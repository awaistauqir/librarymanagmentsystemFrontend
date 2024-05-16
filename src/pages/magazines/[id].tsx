import { ASSETS } from "@/api";
import BookDetail from "@/components/assetDetails/BookDetail";
import MagazineDetail from "@/components/assetDetails/magazineDetail";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Asset } from "@/lib/commonInterfaces";
import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  book: Asset;
}
const Page = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>
          {`Magazine Detail | ${props.book?.title}` || "Book Detail"}
        </title>
      </Head>
      <MagazineDetail asset={props.book} />
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
    const res = await axiosAuth.get(`${ASSETS}/findOne/${context.query.id}`);
    return {
      props: { book: res.data },
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    }
  }
}
