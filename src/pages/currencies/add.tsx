import AddCurrenciesForm from "@/components/forms/AddCurrenciesForm";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const AddCurrencies = () => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Layout>
        <AddCurrenciesForm />
      </Layout>
    </>
  );
};

export default AddCurrencies;
