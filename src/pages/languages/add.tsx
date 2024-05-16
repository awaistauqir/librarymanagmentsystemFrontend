import AddLanguagesForm from "@/components/forms/AddLanguagesForm";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const AddLanguages = () => {
  return (
    <Layout>
      <Head>
        <title>Add Language</title>
      </Head>
      <AddLanguagesForm />
    </Layout>
  );
};

export default AddLanguages;
