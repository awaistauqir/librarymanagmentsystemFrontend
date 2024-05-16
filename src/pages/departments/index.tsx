import { DEPARTMENTS } from "@/api";
import DepartmentFilter from "@/components/filters/departmentFilter";
import DepartmentTable from "@/components/tables/departmentTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Department, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";

interface PageProps {
  pageData: {
    data: Department[];
    meta: PageMeta;
  };
}
const Departments = ({ pageData }: PageProps) => {
  return (
    <>
      <Head>
        <title>Departments</title>
      </Head>
      <Layout>
        <DepartmentFilter />
        <DepartmentTable departments={pageData.data} meta={pageData.meta} />
      </Layout>
    </>
  );
};

export default Departments;
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
    const res = await axiosInstance.get(`${DEPARTMENTS}/pagedata?${query}`);

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
