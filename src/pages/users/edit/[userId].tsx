import { USERS } from "@/api";
import EditUserForm from "@/components/forms/EditUserForm";
import Layout from "@/components/ui/Layout";
import { UserData } from "@/lib/UserInterface";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Department, Designation, Role } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface UserRecord {
  id: string;
  email: string;
  phone: string;
  name: string;
  employee_id: string;
  tel_ext: string;
  roles: Role[];
  department: Department;
  designation: Designation;
}
interface PageProps {
  data: {
    userRecord: UserRecord;
    roles: Role[];
    departments: Department[];
    designations: Designation[];
  };
}

const EditUser = ({ data }: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Edit User</title>
      </Head>
      <h1 className="bg-white text-center text-sky-700 font-bold text-2xl mb-2">
        Update User
      </h1>
      <EditUserForm
        userRecord={data.userRecord}
        roles={data.roles}
        departments={data.departments}
        designations={data.designations}
      />
    </Layout>
  );
};

export default EditUser;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const token = session?.access_token;

  const userId = context.query.userId;
  const axiosAuth = axiosWithAuth(token);
  const reponse = await axiosAuth.get(`${USERS}/update/${userId}`);

  return {
    props: {
      data: reponse.data,
    },
  };
}
