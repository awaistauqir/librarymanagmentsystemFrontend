import { MATERIALTYPES } from "@/api";
import EditMaterialTypeForm from "@/components/forms/EditMaterialTypeForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { MaterialType } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";

import React from "react";

interface PageProps {
  materialtype: MaterialType;
}

const EditMaterialType = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Edit Material</title>
      </Head>
      <EditMaterialTypeForm materialtype={props.materialtype} />
    </Layout>
  );
};

export default EditMaterialType;

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
  const res = await axiosAuth.get(`${MATERIALTYPES}/update/${id}`);

  return {
    props: {
      materialtype: res.data,
    },
  };
}
