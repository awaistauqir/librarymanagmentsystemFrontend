import AddMaterialtypesForm from "@/components/forms/AddMaterialtypesForm";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const AddMaterialtype = () => {
  return (
    <Layout>
      <Head>
        <title>Add Material Type</title>
      </Head>
      <AddMaterialtypesForm />
    </Layout>
  );
};

export default AddMaterialtype;
