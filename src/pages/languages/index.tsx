import { LANGUAGES } from "@/api";
import LanguageFilter from "@/components/filters/languageFilter";
import LanguageTable from "@/components/tables/languageTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Language, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";

interface PageProps {
  pageData: {
    data: Language[];
    meta: PageMeta;
  };
}
const Languages = ({ pageData }: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Languages</title>
      </Head>
      <LanguageFilter />
      <LanguageTable languages={pageData.data} meta={pageData.meta} />
    </Layout>
  );
};

export default Languages;
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
    const res = await axiosInstance.get(`${LANGUAGES}/pagedata?${query}`);

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
