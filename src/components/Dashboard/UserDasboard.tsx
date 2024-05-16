import {
  Asset,
  DataCounts,
  IssuedAsset,
  responsive,
} from "@/lib/commonInterfaces";
import React from "react";
import BlueCard from "./BlueCard";

import useSWR from "swr";
import { BASE_AVATAR, USER_DASHBOARD } from "@/api";
import Loader from "../ui/Loading";
import { getSession } from "next-auth/react";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import Carousel from "react-material-ui-carousel";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface ApiResponse {
  getTenNewArrivals: Asset[];
  dataCounts: DataCounts;
  issued: IssuedAsset[];
  reIssued: IssuedAsset[];
  returned: IssuedAsset[];
}

const UserDasboard = () => {
  const fetcher = async (url: string) => {
    const session = await getSession();
    const axiosAuth = axiosWithAuth(session?.access_token as string);
    const res = await axiosAuth.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR<ApiResponse>(
    `${USER_DASHBOARD}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loader open={true} />;
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <BlueCard>
          <div className="flex justify-start items-center space-x-2">
            <h1 className="text-white font-bold text-xl">Borrowed Assets: </h1>
            <span className="text-white">
              {data?.dataCounts.issuedAssetsCount}
            </span>
          </div>
        </BlueCard>
        <BlueCard>
          <div className="flex justify-start items-center space-x-2">
            <h1 className="text-white font-bold text-xl">Overdue Assets: </h1>
            <span className="text-white">
              {data?.dataCounts.overdueAssetsCount}
            </span>
          </div>
        </BlueCard>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-bold text-lg">New Arrivals</h1>
        <Button variant="contained" LinkComponent={Link} href="/assets">
          See all
        </Button>
      </div>
      <div>
        <Carousel
          NextIcon={<NavigateNextIcon />}
          PrevIcon={<NavigateBeforeIcon />}
          indicators
          height={300}
        >
          {data?.getTenNewArrivals.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-center flex-col py-4"
            >
              <img
                src={
                  asset?.cover
                    ? `${process.env.NEXT_PUBLIC_BASE_URL}/${asset?.cover}`
                    : BASE_AVATAR
                }
                alt={asset.title}
                width={250}
              />
              <h2>{asset.title}</h2>
            </div>
          ))}
        </Carousel>
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <h1 className="font-bold text-sky-900">Currently Issued Assets</h1>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead className="bg-blue-500 !text-white">
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Issued Date</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.issued.map((asset, index) => (
                  <TableRow key={asset.id} className="hover:bg-slate-300">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{asset.issued_asset.title}</TableCell>
                    <TableCell>{asset.issued_asset.category.name}</TableCell>
                    <TableCell>{asset.create_at.split("T")[0]}</TableCell>
                    <TableCell>{asset.due_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <h1 className="font-bold text-sky-900">
              Currently Re-Issued Assets
            </h1>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead className="bg-blue-500 !text-white">
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Re-Issuance Date</TableCell>
                  <TableCell>Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.reIssued.map((asset, index) => (
                  <TableRow key={asset.id} className="hover:bg-slate-300">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{asset.issued_asset.title}</TableCell>
                    <TableCell>{asset.issued_asset.category.name}</TableCell>
                    <TableCell>{asset.updated_at.split("T")[0]}</TableCell>
                    <TableCell>{asset.re_due_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <h1 className="font-bold text-sky-900">Currently Issued Assets</h1>
          </AccordionSummary>
          <AccordionDetails>
            <Table>
              <TableHead className="bg-blue-500 !text-white">
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Re-Issuance Date</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Re-Due Date</TableCell>
                  <TableCell>Return Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.returned.map((asset, index) => (
                  <TableRow key={asset.id} className="hover:bg-slate-300">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{asset.issued_asset.title}</TableCell>
                    <TableCell>{asset.issued_asset.category.name}</TableCell>
                    <TableCell>{asset.updated_at.split("T")[0]}</TableCell>
                    <TableCell>{asset.create_at.split("T")[0]}</TableCell>
                    <TableCell>{asset.re_due_date}</TableCell>
                    <TableCell>{asset.return_date?.split("T")[0]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default UserDasboard;
