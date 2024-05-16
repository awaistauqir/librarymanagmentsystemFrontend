import { MAGAZINES } from "@/api";
import AssetFilter from "@/components/filters/assetFilters/magazineFilter";
import MagazineTable from "@/components/tables/assetTables/magazineTable";
import Layout from "@/components/ui/Layout";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Author,
  Distributor,
  Language,
  Location,
  Magazine,
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
    data: Magazine[];
    meta: PageMeta;
  };
  publishers: Publisher[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  authors: Author[];
  distributors: Distributor[];
}

const Magazines = (props: PageProps) => {
  return (
    <Layout>
      <Head>
        <title>Magazines</title>
      </Head>
      <AssetFilter
        material_types={props.material_types}
        locations={props.locations}
        languages={props.languages}
      />
      <MagazineTable
        megazines={props.pagedata.data}
        meta={props.pagedata.meta}
      />
    </Layout>
  );
};

export default Magazines;
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
    const pageData = (await axiosAuth.get(`${MAGAZINES}/pagedata?${query}`))
      .data;
    return {
      props: pageData,
    };
  } catch (e) {
    return {
      props: {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      },
    };
  }
}
