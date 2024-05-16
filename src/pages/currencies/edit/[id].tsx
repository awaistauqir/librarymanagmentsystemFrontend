import { CURRENCIES } from "@/api";
import EditCurrencyForm from "@/components/forms/EditCurrencyForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Currency } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import React from "react";

interface PageProps {
  currency: Currency;
}

const EditCurrency = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Edit Currency</title>
      </Head>
      <Layout>
        <EditCurrencyForm currency={props.currency} />
      </Layout>
    </>
  );
};

export default EditCurrency;

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
  const res = await axiosAuth.get(`${CURRENCIES}/update/${id}`);

  return {
    props: {
      currency: res.data,
    },
  };
}
