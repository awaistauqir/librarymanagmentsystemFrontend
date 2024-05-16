import { USER_PAGEDATA } from "@/api";
import UserFilter from "@/components/filters/userListFilter";
import UserTable from "@/components/tables/userTable";
import Layout from "@/components/ui/Layout";
import { UserPageData } from "@/lib/UserInterface";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";
interface PageProps {
  pageData: UserPageData;
}
const Users = ({ pageData }: PageProps) => {
  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Layout>
        <div>
          <UserFilter
            roles={pageData.roles}
            departments={pageData.departments}
            designations={pageData.designations}
          />

          <UserTable
            users={pageData.pagedata.data}
            count={pageData.pagedata.meta.itemCount}
            pageCount={pageData.pagedata.meta.pageCount}
          />
        </div>
      </Layout>
    </>
  );
};
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const query = stringify(context.query);

  // first check that there is a token
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const axiosInstance = axiosWithAuth(session.access_token);

  try {
    const res = await axiosInstance.get(`${USER_PAGEDATA}?${query}`);

    if (res.data) {
      return {
        props: {
          pageData: res.data,
        },
      };
    }
  } catch (e) {
    return {
      // redirect: {
      //   destination: "/login",
      //   permanent: false,
      // },
    };
  }
}

export default Users;
