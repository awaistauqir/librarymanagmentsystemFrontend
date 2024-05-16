import { LOCATIONS } from "@/api";
import LocationFilter from "@/components/filters/locationFilter";
import LocationTable from "@/components/tables/locationTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import { Location, PageMeta } from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";
interface PageProps {
  pageData: {
    data: Location[];
    meta: PageMeta;
  };
}
const Locations = ({ pageData }: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Locations</title>
      </Head>
      <LocationFilter />
      <LocationTable locations={pageData.data} meta={pageData.meta} />
    </Layout>
  );
};

export default Locations;
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
    const res = await axiosInstance.get(`${LOCATIONS}/pagedata?${query}`);

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
