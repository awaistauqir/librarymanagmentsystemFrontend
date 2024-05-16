import { JOURNALS } from "@/api";
import AssetFilter from "@/components/filters/assetFilters/journalFilter";
import JournalTable from "@/components/tables/assetTables/journalTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Author,
  Distributor,
  Journal,
  Language,
  Location,
  MaterialType,
  PageMeta,
  Publisher,
} from "@/lib/commonInterfaces";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { stringify } from "querystring";
import React from "react";
interface PageProps {
  pagedata: {
    data: Journal[];
    meta: PageMeta;
  };
  publishers: Publisher[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  authors: Author[];
  distributors: Distributor[];
}

const Journals = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Journals</title>
      </Head>
      <Layout>
        <AssetFilter
          material_types={props.material_types}
          locations={props.locations}
          languages={props.languages}
        />
        <JournalTable
          journals={props.pagedata.data}
          meta={props.pagedata.meta}
        />
      </Layout>
    </>
  );
};

export default Journals;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const query = stringify(context.query);
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
    const pageData = (await axiosAuth.get(`${JOURNALS}/pagedata?${query}`))
      .data;
    return {
      props: pageData,
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
}
