import { JOURNALS } from "@/api";
import EditJournalForm from "@/components/editAssets/EditJournal";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Journal,
  Currency,
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
  journalRecord: Journal;
  publishers: Publisher[];
  distributors: Distributor[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  currencies: Currency[];
}
const Page = ({
  journalRecord,
  publishers,
  distributors,
  material_types,
  languages,
  locations,
  currencies,
}: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Edit Magazine</title>
      </Head>
      <EditJournalForm
        journalRecord={journalRecord}
        publishers={publishers}
        distributors={distributors}
        material_types={material_types}
        languages={languages}
        locations={locations}
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
    const res = await axiosAuth.get(`${JOURNALS}/update/${context.params?.id}`);

    return {
      props: res.data,
    };
  } catch (err) {
    console.log(err);
  }
}
