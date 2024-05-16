import { ASSETS } from "@/api";
import LibraryAssets from "@/components/library_assets/LibraryAssets";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Asset,
  Category,
  Department,
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
    data: Asset[];
    meta: PageMeta;
  };
  category: Category[];
  departments: Department[];
  locations: Location[];
  material_types: MaterialType[];
  publishers: Publisher[];
  languages: Language[];
}
const Page = (props: PageProps) => {
  return (
    <>
      <Head>
        <title>Library Assets</title>
      </Head>
      <Layout>
        <LibraryAssets
          pagedata={props.pagedata}
          category={props.category}
          languages={props.languages}
          publishers={props.publishers}
          material_types={props.material_types}
          departments={props.departments}
          locations={props.locations}
        />
      </Layout>
    </>
  );
};

export default Page;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const query = stringify(context.query);
  const axiosAuth = axiosWithAuth(session?.access_token);

  const response = await axiosAuth.get(`${ASSETS}/pagedata?${query}`);

  return {
    props: response.data,
  };
}
