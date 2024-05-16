import { EBOOKS } from "@/api";
import EbookFilter from "@/components/filters/assetFilters/ebookFilter";
import EbookTable from "@/components/tables/ebookTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Author,
  Ebook,
  Department,
  Distributor,
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
  pageData: {
    data: Ebook[];
    meta: PageMeta;
  };
  departments: Department[];
  publishers: Publisher[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  authors: Author[];
  distributors: Distributor[];
}

const Ebooks = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Ebooks</title>
      </Head>
      <Layout>
        <EbookFilter
          material_types={props.material_types}
          departments={props.departments}
          languages={props.languages}
        />
        <EbookTable ebooks={props.pageData.data} meta={props.pageData.meta} />
      </Layout>
    </>
  );
};

export default Ebooks;
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
    const pageData = (await axiosAuth.get(`${EBOOKS}/pagedata?${query}`)).data;
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
