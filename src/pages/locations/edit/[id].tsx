import { LOCATIONS } from "@/api";
import EditLocationForm from "@/components/forms/EditLocationForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Location } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";

interface PageProps {
  location: Location;
}

const EditLocation = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Edit Loacation</title>
      </Head>
      <EditLocationForm location={props.location} />
    </Layout>
  );
};

export default EditLocation;

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
  const res = await axiosAuth.get(`${LOCATIONS}/update/${id}`);

  return {
    props: {
      location: res.data,
    },
  };
}
