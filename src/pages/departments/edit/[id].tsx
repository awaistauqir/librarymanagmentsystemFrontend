import { DEPARTMENTS } from "@/api";
import EditDepartmentForm from "@/components/forms/EditDepartmentForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Department } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
interface PageProps {
  department: Department;
}
const EditDepartment = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Edit Department</title>
      </Head>
      <Layout>
        <EditDepartmentForm department={props.department} />
      </Layout>
    </>
  );
};

export default EditDepartment;
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
  const res = await axiosAuth.get(`${DEPARTMENTS}/update/${id}`);
  return {
    props: {
      department: res.data,
    },
  };
}
