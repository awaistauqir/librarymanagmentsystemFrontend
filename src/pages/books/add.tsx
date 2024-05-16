import { BOOKS } from "@/api";
import AddBookFrom from "@/components/forms/AssetForms/AddBookForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Currency,
  Department,
  Distributor,
  Language,
  MaterialType,
  Publisher,
  Location,
} from "@/lib/commonInterfaces";
import { AxiosError } from "axios";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  publishers: Publisher[];
  distributors: Distributor[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  departments: Department[];
  authors: string[];
  currencies: Currency[];
}
const Page = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Add Books</title>
      </Head>
      <Layout>
        <AddBookFrom
          publishers={props.publishers}
          distributors={props.distributors}
          material_types={props.material_types}
          languages={props.languages}
          locations={props.locations}
          departments={props.departments}
          authors={props.authors}
          currencies={props.currencies}
        />
      </Layout>
    </>
  );
};

export default Page;
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
    const res = await axiosAuth.get(`${BOOKS}/create`);
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
