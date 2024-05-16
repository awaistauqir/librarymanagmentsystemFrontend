import { BOOKS } from "@/api";
import BookFilter from "@/components/filters/assetFilters/bookFilter";
import BookTable from "@/components/tables/assetTables/bookTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Author,
  Book,
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
  pagedata: {
    data: Book[];
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

const Books = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Books</title>
      </Head>
      <Layout>
        <BookFilter
          material_types={props.material_types}
          locations={props.locations}
          departments={props.departments}
          languages={props.languages}
        />
        <BookTable books={props.pagedata.data} meta={props.pagedata.meta} />
      </Layout>
    </>
  );
};

export default Books;
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
    const pageData = (await axiosAuth.get(`${BOOKS}/pagedata?${query}`)).data;
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
