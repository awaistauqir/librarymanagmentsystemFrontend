import { EBOOKS } from "@/api";
import EditEbookForm from "@/components/editAssets/EditEbook";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Ebook,
  Currency,
  Distributor,
  Department,
  Language,
  MaterialType,
  Publisher,
} from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import React from "react";
interface PageProps {
  bookRecord: Ebook;
  publishers: Publisher[];
  distributors: Distributor[];
  material_types: MaterialType[];
  languages: Language[];
  currencies: Currency[];
  departments: Department[];
  authors: string[];
}
const Page = ({
  bookRecord,
  publishers,
  distributors,
  material_types,
  languages,
  departments,
  authors,
  currencies,
}: PageProps) => {
  //   console.log(eboo);
  return (
    <Layout>
      <Head>
        <title>Edit Ebook</title>
      </Head>
      <EditEbookForm
        bookRecord={bookRecord}
        publishers={publishers}
        distributors={distributors}
        material_types={material_types}
        languages={languages}
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
    const res = await axiosAuth.get(`${EBOOKS}/update/${context.params?.id}`);
    return {
      props: res.data,
    };
  } catch (err) {
    console.log(err);
  }
}
