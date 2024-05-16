import { CATEGORIES } from "@/api";
import CategoryFilter from "@/components/filters/categoryFilter";
import CategoryTable from "@/components/tables/categoryTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Category, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";

interface PageProps {
  pageData: {
    data: Category[];
    meta: PageMeta;
  };
}
const Categorys = ({ pageData }: PageProps) => {
  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <Layout>
        <CategoryFilter />
        <CategoryTable categories={pageData.data} meta={pageData.meta} />
      </Layout>
    </>
  );
};

export default Categorys;
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
    const res = await axiosInstance.get(`${CATEGORIES}/pagedata?${query}`);

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
