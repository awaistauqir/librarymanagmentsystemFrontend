import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function protectedRouteHandler(
  session: Session | null,
  context: GetServerSidePropsContext,
  handler: (
    context:
      | GetServerSidePropsContext
      | { req: NextApiRequest; res: NextApiResponse }
  ) => any
) {
  if (!session) {
    return {
      redirect: {
        destination: "/login", // Redirect to login page if not authenticated
        permanent: false,
      },
    };
  }

  return handler(context);
}
