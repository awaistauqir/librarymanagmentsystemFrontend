import { DESIGNATIONS } from "@/api";
import DesignationFilter from "@/components/filters/designationFilter";
import DesignationTable from "@/components/tables/designationTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Designation, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";
interface PageProps {
  pageData: {
    data: Designation[];
    meta: PageMeta;
  };
}
const Designations = ({ pageData }: PageProps) => {
  return (
    <>
      <Head>
        <title>Designations</title>
      </Head>
      <Layout>
        <DesignationFilter />
        <DesignationTable designations={pageData.data} meta={pageData.meta} />
      </Layout>
    </>
  );
};

export default Designations;
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
    const res = await axiosInstance.get(`${DESIGNATIONS}/pagedata?${query}`);

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
