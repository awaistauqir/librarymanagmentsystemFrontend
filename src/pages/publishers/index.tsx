import { PUBLISHERS } from "@/api";
import PublisherFilter from "@/components/filters/publisherFilter";
import PublisherTable from "@/components/tables/publisherTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Publisher, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";
interface PageProps {
  pageData: {
    data: Publisher[];
    meta: PageMeta;
  };
}
const Publishers = ({ pageData }: PageProps) => {
  return (
    <>
      <Head>
        <title>Publishers</title>
      </Head>
      <Layout>
        <PublisherFilter />
        <PublisherTable publishers={pageData.data} meta={pageData.meta} />
      </Layout>
    </>
  );
};

export default Publishers;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const query = stringify(context.query);

  // first check that there is a token
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const axiosInstance = axiosWithAuth(session.access_token);

  try {
    const res = await axiosInstance.get(`${PUBLISHERS}/pagedata?${query}`);

    if (res.data) {
      return {
        props: {
          pageData: res.data,
        },
      };
    }
  } catch (e) {
    return {
      // redirect: {
      //   destination: "/login",
      //   permanent: false,
      // },
    };
  }
}
