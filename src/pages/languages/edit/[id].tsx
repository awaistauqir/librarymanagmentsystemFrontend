import { LANGUAGES } from "@/api";
import EditLanguageForm from "@/components/forms/EditLanguageForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Language } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import React from "react";
interface PageProps {
  language: Language;
}
const EditLanguage = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Edit Language</title>
      </Head>
      <EditLanguageForm language={props.language} />
    </Layout>
  );
};

export default EditLanguage;
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
  const res = await axiosAuth.get(`${LANGUAGES}/update/${id}`);
  return {
    props: {
      language: res.data,
    },
  };
}
