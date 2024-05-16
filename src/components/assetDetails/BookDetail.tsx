import { Asset } from "@/lib/commonInterfaces";
import { Button, Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import React from "react";
import Barcode from "react-barcode";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface Props {
  asset: Asset;
}
const BookDetail = ({ asset }: Props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1 className="bg-white text-center text-sky-700 font-bold text-2xl mb-2">
        Book Detail
      </h1>
      <div className="flex space-x-4 justify-start items-center">
        <img
          src={
            asset.cover
              ? `${process.env.NEXT_PUBLIC_BASE_URL}/${asset.cover}`
              : `${process.env.NEXT_PUBLIC_BASE_URL}/avatar/noImage.jpg`
          }
          alt="some text"
          width={250}
          height={250}
          className="rounded-lg hidden sm:block"
        />
        <div>
          <h1 className="font-bold">
            Title: <span>{asset.title}</span>
          </h1>
          <h1 className="font-bold">
            Author: <span>{asset.author}</span>
          </h1>

          <h1 className="font-bold">
            Category: <span>{asset.category.name}</span>
          </h1>
          <h1
            className={`font-bold ${
              asset.is_available ? "text-green-500" : "text-red-500"
            }`}
          >
            Availability:{" "}
            <span>{asset.is_available ? "Yes" : "Not Available"}</span>
          </h1>
        </div>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Detail" {...a11yProps(0)} />
          <Tab label="Description" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full p-4">
          <p>
            <span className="font-bold">Acc. No.: </span>
            <span>{asset.acc_no}</span>
          </p>
          <p>
            <span className="font-bold">Title: </span>
            <span>{asset.title}</span>
          </p>
          <p>
            <span className="font-bold">Edition: </span>
            <span>{asset.edition_no}</span>
          </p>
          <p>
            <span className="font-bold">Distributor: </span>
            <span>{asset.distributer?.name}</span>
          </p>
          <p>
            <span className="font-bold">Location: </span>
            <span>{asset.location.name}</span>
          </p>
          <p>
            <span className="font-bold">Department: </span>
            <span>{asset.department?.name}</span>
          </p>
          <p>
            <span className="font-bold">Created by: </span>
            <span>{asset.created_by_user.name}</span>
          </p>
          <p>
            <span className="font-bold">Updated by: </span>
            <span>{asset.updated_by_user?.name}</span>
          </p>
          <p>
            <span className="font-bold">Archived by: </span>
            <span>{asset.archived_by_user?.name}</span>
          </p>
          <p>
            <span className="font-bold">Material Type: </span>
            <span>{asset.material_type?.name}</span>
          </p>
          <p>
            <span className="font-bold">Total Pages: </span>
            <span>{asset.total_pages}</span>
          </p>

          <p>
            <span className="font-bold">Call No.: </span>
            <span>{asset?.call_no}</span>
          </p>
          <p>
            <span className="font-bold">Subtitle: </span>
            <span>{asset.subTitle}</span>
          </p>
          <p>
            <span className="font-bold">Sub Authors: </span>
            <span>{asset.subAuthor.join(", ")}</span>
          </p>
          <p>
            <span className="font-bold">Accomanpnaying Material: </span>
            <span>{asset.accompanying_material}</span>
          </p>
          <p>
            <span className="font-bold">ISBN: </span>
            <span>{asset.isbn_no}</span>
          </p>
          <p>
            <span className="font-bold">Publishing Year: </span>
            <span>{asset.publishing_year}</span>
          </p>
          <p>
            <span className="font-bold">Price: </span>
            <span>{asset.price}</span>
          </p>
          <p>
            <span className="font-bold">Language: </span>
            <span>{asset.language.name}</span>
          </p>
          <p>
            <span className="font-bold">Location Placed: </span>
            <span>{asset.location_placed}</span>
          </p>
          <p>
            <span className="font-bold">Donated By: </span>
            <span>{asset.donated_by}</span>
          </p>
        </div>
        <Barcode value={asset.barcode} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {asset.description}
      </CustomTabPanel>
      <div className="flex justify-end p-4 space-x-4">
        <Button variant="outlined" LinkComponent={Link} href="/books">
          Back
        </Button>
        {!asset.is_available && (
          <Button
            variant="contained"
            LinkComponent={Link}
            href={`/books/reissuance/${asset.id}`}
          >
            Re-issue
          </Button>
        )}
        {asset.is_available && (
          <Button
            variant="contained"
            LinkComponent={Link}
            href={`/books/issuance/${asset.id}`}
          >
            Issue
          </Button>
        )}
        {!asset.is_available && (
          <Button
            variant="contained"
            LinkComponent={Link}
            href={`/books/return/${asset.id}`}
          >
            Return
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
