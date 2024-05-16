import AddDesignationsForm from "@/components/forms/AddDesignationsForm";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const AddDesignation = () => {
  return (
    <>
      <Head>
        <title>Add Designation</title>
      </Head>
      <Layout>
        <AddDesignationsForm />
      </Layout>
    </>
  );
};

export default AddDesignation;
