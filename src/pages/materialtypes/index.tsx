import { MATERIALTYPES } from "@/api";
import MaterialTypeFilter from "@/components/filters/materialTypeFilter";
import MaterialTypeTable from "@/components/tables/materialTypeTable";

import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { MaterialType, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";
interface PageProps {
  pageData: {
    data: MaterialType[];
    meta: PageMeta;
  };
}
const MaterialTypes = ({ pageData }: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Material Types</title>
      </Head>
      <MaterialTypeFilter />
      <MaterialTypeTable materialtypes={pageData.data} meta={pageData.meta} />
    </Layout>
  );
};

export default MaterialTypes;
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
    const res = await axiosInstance.get(`${MATERIALTYPES}/pagedata?${query}`);

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
