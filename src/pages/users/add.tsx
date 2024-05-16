import { USERS } from "@/api";
import AddUserForm from "@/components/forms/AddUser";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Department, Designation, Role } from "@/lib/commonInterfaces";
import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  roles: Role[];
  departments: Department[];
  designations: Designation[];
}
const Add = (props: PageProps) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Add User</title>
        </Head>
        <AddUserForm
          departments={props.departments}
          roles={props.roles}
          designations={props.designations}
        />
      </Layout>
    </>
  );
};

export default Add;
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
  const axiosAuth = axiosWithAuth(session.access_token);
  try {
    const res = await axiosAuth.get(`${USERS}/create`);
    return {
      props: res.data,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
    }
  }
}
