import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import { AssetReturn } from "@/lib/commonInterfaces";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ASSETS_RETURN } from "@/api";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Loader from "../ui/Loading";
import trimStrings from "@/lib/stringTrimmer";
import { number, object, string } from "yup";
import Link from "next/link";

interface Props {
  returnAsset: AssetReturn;
}
const BookReturn = (props: Props) => {
  const useAxiosWithAuth = useAxiosAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const formSchema = object().shape({
    fine_amount: number()
      .typeError("Fine must be a number")
      .min(0, "Fine cannot be less than zero.")
      .notRequired(),
    remarks_on_return_condition: string().notRequired(),
  });
  const formik = useFormik({
    validationSchema: formSchema,
    initialValues: {
      fine_amount: "",

      remarks_on_return_condition: "",
    },

    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await useAxiosWithAuth.patch(
          `   ${ASSETS_RETURN}/${props.returnAsset.issued_asset.id}`,
          trimStrings(values)
        );
        Swal.fire({
          title: "Sucess",
          text: "Book Returned Successfully",
          icon: "success",
        });
        router.replace(`/books/${props.returnAsset.issued_asset.id}`);
      } catch (error) {
        if (error instanceof AxiosError) {
          Swal.fire({
            title: "Error",
            text: error.response?.data.message || "Book return failed",
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
        Book Return
      </h1>
      <form className="space-x-4 space-y-4" onSubmit={formik.handleSubmit}>
        <h2 className="text-lg font-bold">Book Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Acc No."
            size="small"
            fullWidth
            value={props.returnAsset.issued_asset.acc_no}
          />
          <TextField
            label="Title"
            size="small"
            fullWidth
            value={props.returnAsset.issued_asset.title}
          />
          <TextField
            label="Author"
            size="small"
            fullWidth
            value={props.returnAsset.issued_asset.author}
          />
        </div>
        <h2 className="text-lg font-bold">Borrower Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="User's Department"
            size="small"
            fullWidth
            value={props.returnAsset.borrower.name}
          />
          <TextField
            label="User's Email"
            size="small"
            fullWidth
            value={props.returnAsset.borrower.email}
          />

          <TextField
            label="User's Telephone Extension"
            size="small"
            fullWidth
            value={props.returnAsset.borrower.tel_ext}
          />

          <TextField
            label="Department"
            size="small"
            fullWidth
            value={props.returnAsset.borrower.department.name}
          />
        </div>
        <h2 className="text-lg font-bold">Issuance Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Due Date"
            size="small"
            fullWidth
            value={props.returnAsset.due_date}
          />
          <TextField
            label="Issued by"
            size="small"
            fullWidth
            value={props.returnAsset.issued_by.name}
          />
        </div>
        <h2 className="text-lg font-bold">Re-Issuance Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Due Date"
            size="small"
            fullWidth
            value={props.returnAsset.re_due_date}
          />
          <TextField
            label="Re-issued by "
            size="small"
            fullWidth
            value={props.returnAsset.re_issued_by?.name || ""}
          />
        </div>
        <h2 className="text-lg font-bold">Return Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Return Date "
            size="small"
            fullWidth
            value={new Date().toDateString()}
          />
          <TextField
            label="Fine Amount"
            size="small"
            fullWidth
            name="fine_amount"
            id="fine_amount"
            value={formik.values.fine_amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.fine_amount && Boolean(formik.errors.fine_amount)
            }
            helperText={formik.touched.fine_amount && formik.errors.fine_amount}
          />
        </div>
        <TextField
          fullWidth
          name="remarks_on_return_condition"
          id="remarks_on_return_condition"
          label="Remarks on Return Condition"
          size="medium"
          value={formik.values.remarks_on_return_condition}
          onChange={formik.handleChange}
        />
        <div className="flex justify-end items-center space-x-4">
          <Button
            variant="outlined"
            LinkComponent={Link}
            href={`/books/${props.returnAsset.issued_asset.id}`}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Return
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookReturn;
