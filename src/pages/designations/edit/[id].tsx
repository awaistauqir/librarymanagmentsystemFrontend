import { DESIGNATIONS } from "@/api";
import EditDesignationForm from "@/components/forms/EditDesignationForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Designation } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import React from "react";
interface PageProps {
  designation: Designation;
}
const EditDesignation = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Edit Designation</title>
      </Head>
      <Layout>
        <EditDesignationForm designation={props.designation} />
      </Layout>
    </>
  );
};

export default EditDesignation;
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
  const axiosAuth = axiosWithAuth(session?.access_token);
  const id = context.query.id;
  const res = await axiosAuth.get(`${DESIGNATIONS}/update/${id}`);
  return {
    props: {
      designation: res.data,
    },
  };
}
