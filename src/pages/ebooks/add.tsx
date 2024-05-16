import { EBOOKS } from "@/api";
import AddEbookForm from "@/components/forms/AssetForms/AddEbookForm";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Currency,
  Department,
  Distributor,
  Language,
  MaterialType,
  Publisher,
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
    <Layout>
      <Head>
        <title>Add Ebook</title>
      </Head>
      <AddEbookForm
        publishers={props.publishers}
        distributors={props.distributors}
        material_types={props.material_types}
        languages={props.languages}
        departments={props.departments}
        authors={props.authors}
        currencies={props.currencies}
      />
    </Layout>
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
    const res = await axiosAuth.get(`${EBOOKS}/create`);
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
