import { PUBLISHERS } from "@/api";
import EditPublisherForm from "@/components/forms/EditPublisherForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Publisher } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import React from "react";

interface PageProps {
  publisher: Publisher;
}

const EditPublisher = (props: PageProps) => {
  return (
    <Layout>
      <EditPublisherForm publisher={props.publisher} />
    </Layout>
  );
};

export default EditPublisher;

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
  const res = await axiosAuth.get(`${PUBLISHERS}/update/${id}`);

  return {
    props: {
      publisher: res.data,
    },
  };
}
