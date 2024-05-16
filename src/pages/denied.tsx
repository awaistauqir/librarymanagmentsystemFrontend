import Head from "next/head";
import Link from "next/link";

const DeniedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Head>
        <title>Access Denied</title>
      </Head>
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="text-gray-700 mt-4">
          You do not have permission to access this page.
        </p>
        <Link href={"/"} className="text-blue-500 underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DeniedPage;
