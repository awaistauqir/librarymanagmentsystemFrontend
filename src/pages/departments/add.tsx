import AddDepartmentForm from "@/components/forms/AddDepartmentForm";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const AddDepartment = () => {
  return (
    <>
      <Head>
        <title>Add Departments</title>
      </Head>
      <Layout>
        <AddDepartmentForm />
      </Layout>
    </>
  );
};

export default AddDepartment;
