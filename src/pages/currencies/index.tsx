import { CURRENCIES } from "@/api";
import CurrencyFilter from "@/components/filters/currencyFilter";
import CurrencyTable from "@/components/tables/currencyTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Currency, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";
interface PageProps {
  pageData: {
    data: Currency[];
    meta: PageMeta;
  };
}
const Currencies = ({ pageData }: PageProps) => {
  return (
    <>
      <Head>
        <title>Currenices</title>
      </Head>
      <Layout>
        <CurrencyFilter />
        <CurrencyTable currencies={pageData.data} meta={pageData.meta} />
      </Layout>
    </>
  );
};

export default Currencies;
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
    const res = await axiosInstance.get(`${CURRENCIES}/pagedata?${query}`);

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
