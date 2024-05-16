import AddLocationsForm from "@/components/forms/AddLocationsForms";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const AddLocations = () => {
  return (
    <Layout>
      <Head>
        <title>Add Location</title>
      </Head>
      <AddLocationsForm />
    </Layout>
  );
};

export default AddLocations;
