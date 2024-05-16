import { NOVELS } from "@/api";
import EditNovelForm from "@/components/editAssets/EditNovel";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Novel,
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
  novelRecord: Novel;
  publishers: Publisher[];
  distributors: Distributor[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  currencies: Currency[];
  authors: string[];
}
const Page = ({
  novelRecord,
  publishers,
  distributors,
  material_types,
  languages,
  locations,
  authors,
  currencies,
}: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Edit Novel</title>
      </Head>
      <EditNovelForm
        novelRecord={novelRecord}
        publishers={publishers}
        distributors={distributors}
        material_types={material_types}
        languages={languages}
        locations={locations}
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
    const res = await axiosAuth.get(`${NOVELS}/update/${context.params?.id}`);

    return {
      props: res.data,
    };
  } catch (err) {
    console.log(err);
  }
}
