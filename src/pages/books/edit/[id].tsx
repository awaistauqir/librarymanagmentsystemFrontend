import { BOOKS } from "@/api";
import EditBookForm from "@/components/editAssets/EditBook";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Book,
  Currency,
  Department,
  Distributor,
  Language,
  MaterialType,
  Publisher,
  Location,
} from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  bookRecord: Book;
  publishers: Publisher[];
  distributors: Distributor[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  departments: Department[];
  authors: string[];
  currencies: Currency[];
}
const Page = ({
  bookRecord,
  publishers,
  distributors,
  material_types,
  languages,
  locations,
  departments,
  authors,
  currencies,
}: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Edit Book</title>
      </Head>
      <EditBookForm
        bookRecord={bookRecord}
        publishers={publishers}
        distributors={distributors}
        material_types={material_types}
        languages={languages}
        locations={locations}
        departments={departments}
        authors={authors}
        currencies={currencies}
      />
    </Layout>
  );
};

export default Page;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const axiosAuth = axiosWithAuth(session?.access_token);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  try {
    const res = await axiosAuth.get(`${BOOKS}/update/${context.params?.id}`);

    return {
      props: res.data,
    };
  } catch (err) {
    console.log(err);
  }
}
