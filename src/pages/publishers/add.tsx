import AddPublishersForm from "@/components/forms/AddPublishersForm";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const AddPublisher = () => {
  return (
    <>
      <Head>
        <title>Add Publisher</title>
      </Head>
      <Layout>
        <AddPublishersForm />
      </Layout>
    </>
  );
};

export default AddPublisher;
