"use client";
import ScanForm from "@/components/forms/ScanForm";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <div>
      <Head>
        <title>Scan Barcode</title>
      </Head>
      <Layout>
        <ScanForm />
      </Layout>
    </div>
  );
};

export default Page;
