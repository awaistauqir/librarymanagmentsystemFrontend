"use client";
import LibrarianDashboard from "@/components/Dashboard/LibrarianDashboard";
import UserDasboard from "@/components/Dashboard/UserDasboard";
import Layout from "@/components/ui/Layout";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const session = useSession();
  const isLibrarian = session.data?.user.roles
    .map((r) => r.name)
    .includes("librarian");
  const isUser = session.data?.user.roles.map((r) => r.name).includes("user");
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout>
        {isUser && <UserDasboard />}
        {isLibrarian && <LibrarianDashboard />}
      </Layout>
    </>
  );
}
