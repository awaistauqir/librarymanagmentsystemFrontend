import { ROLES } from "@/api";
import RoleTable from "@/components/tables/roleTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { PageMeta, Role } from "@/lib/commonInterfaces";
import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";

interface PageProps {
  pageData: {
    data: Role[];
    meta: PageMeta;
  };
}
const Roles = ({ pageData }: PageProps) => {
  return (
    <>
      <Head>
        <title>Roles</title>
      </Head>
      <Layout>
        <h1 className="bg-white text-center text-sky-700 font-bold text-2xl mb-2">
          Role List
        </h1>
        <RoleTable data={pageData.data} meta={pageData.meta} />
      </Layout>
    </>
  );
};

export default Roles;
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
    const res = await axiosInstance.get(`${ROLES}/pagedata?${query}`);

    if (res.data) {
      return {
        props: {
          pageData: res.data,
        },
      };
    }
  } catch (e) {
    if (e instanceof AxiosError) {
    }
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
