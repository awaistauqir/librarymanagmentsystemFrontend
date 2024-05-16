import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { BorrowedItem } from "@/lib/commonInterfaces";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ASSETS_REISSUANCE } from "@/api";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Loader from "../ui/Loading";

interface Props {
  borrowedItem: BorrowedItem;
}
const NovelReissuance = (props: Props) => {
  const re_due_date = new Date(
    props.borrowedItem.re_due_date
      ? props.borrowedItem.re_due_date
      : props.borrowedItem.due_date
  );

  re_due_date.setDate(re_due_date.getDate() + 15);

  const useAxiosWithAuth = useAxiosAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {},

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await useAxiosWithAuth.post(
          `${ASSETS_REISSUANCE}/${props.borrowedItem.issued_asset.id}`
        );
        Swal.fire({
          title: "Sucess",
          text: "Novel Issued Successfully",
          icon: "success",
        });
        router.replace(`/novels/${props.borrowedItem.issued_asset.id}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          Swal.fire({
            text: error.response?.data.message || "Something went wrong",
            icon: "error",
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <Loader open={loading} />
      <h1 className="bg-white text-center text-sky-700 font-bold text-2xl mb-2">
        Novel Issuance
      </h1>
      <form className="space-x-4 space-y-4" onSubmit={formik.handleSubmit}>
        <h2 className="text-lg font-bold">Novel Reissuance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Title"
            size="small"
            fullWidth
            value={props.borrowedItem.issued_asset.title}
          />
          <TextField
            label="Author"
            size="small"
            fullWidth
            value={props.borrowedItem.issued_asset.author}
          />
        </div>
        <h2 className="text-lg font-bold">Borrower Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="User's Name"
            size="small"
            fullWidth
            value={props.borrowedItem.borrower.name}
          />
          <TextField
            label="User's Email"
            size="small"
            fullWidth
            value={props.borrowedItem.borrower.email}
          />

          <TextField
            label="User's Telephone Extension"
            size="small"
            fullWidth
            value={props.borrowedItem.borrower.tel_ext}
          />

          <TextField
            label="Department"
            size="small"
            fullWidth
            value={props.borrowedItem.borrower.department.name}
          />
        </div>
        <h2 className="text-lg font-bold">Issuance Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Due Date"
            size="small"
            fullWidth
            value={props.borrowedItem.due_date}
          />
          <TextField
            label="Due Date"
            size="small"
            fullWidth
            value={props.borrowedItem.issued_by.name}
          />
        </div>
        <h2 className="text-lg font-bold">Re-Issuance Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Due Date"
            size="small"
            fullWidth
            value={props.borrowedItem.re_due_date || re_due_date.toDateString()}
          />
        </div>
        <div className="flex justify-end items-center space-x-4">
          <Button
            variant="outlined"
            href={`/novels/${props.borrowedItem.issued_asset.id}`}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Re-Issue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NovelReissuance;
