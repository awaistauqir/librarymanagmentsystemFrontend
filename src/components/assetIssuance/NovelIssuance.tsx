import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { useFormik } from "formik";
import { object, string } from "yup";
import { IssuedUser, IssuingAsset } from "@/lib/commonInterfaces";
import CustomSelectId from "../dropdown/CustomSelectID";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ASSETS_ISSUANCE } from "@/api";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import Loader from "../ui/Loading";
import trimStrings from "@/lib/stringTrimmer";

interface Props {
  issuing_asset: IssuingAsset;
  userList: IssuedUser[];
}
const NovelIssuance = (props: Props) => {
  const dueDate = new Date();
  const [loading, setLoading] = useState<boolean>(false);
  dueDate.setMonth(dueDate.getMonth() + 1);
  const useAxiosWithAuth = useAxiosAuth();
  const router = useRouter();

  const formSchema = object().shape({
    borrowerId: string().required("Please Select a borrower"),
    assetId: string().required("Please Select an asset"),
  });
  const formik = useFormik({
    initialValues: {
      assetId: props.issuing_asset.id.toString(),
      borrowerId: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await useAxiosWithAuth.post(
          ASSETS_ISSUANCE,
          trimStrings(values)
        );
        Swal.fire({
          title: "Sucess",
          text: "Novel Issued Successfully",
          icon: "success",
        });
        router.replace(`/novels/${props.issuing_asset.id}`);
      } catch (error) {
        Swal.fire({
          title: "Sucess",
          text: "Novel Issued Successfully",
          icon: "success",
        });
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
        <h2 className="text-lg font-bold">Novel Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Title"
            size="small"
            fullWidth
            value={props.issuing_asset.title}
          />
          <TextField
            label="Author"
            size="small"
            fullWidth
            value={props.issuing_asset.author}
          />
        </div>
        <h2 className="text-lg font-bold">Borrower Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomSelectId
            id="borrowerId"
            label="Borrower *"
            options={props.userList.map((user) => ({
              id: user.id,
              name: user.name,
            }))}
            onChange={(event) => {
              formik.setFieldValue("borrowerId", event.target.value);
            }}
            value={formik.values.borrowerId}
            errorCondition={
              formik.touched.borrowerId && Boolean(formik.errors.borrowerId)
            }
            error={formik.errors.borrowerId}
          />
          <TextField
            label="User's Name"
            size="small"
            fullWidth
            value={
              props.userList.find(
                (user) => user.id === formik.values.borrowerId
              )?.name || ""
            }
          />
          <TextField
            label="User's Email"
            size="small"
            fullWidth
            value={
              props.userList.find(
                (user) => user.id === formik.values.borrowerId
              )?.email || ""
            }
          />

          <TextField
            label="User's Telephone Extension"
            size="small"
            fullWidth
            value={
              props.userList.find(
                (user) => user.id === formik.values.borrowerId
              )?.tel_ext || ""
            }
          />

          <TextField
            label="Due Date"
            size="small"
            fullWidth
            value={dueDate.toDateString()}
          />
        </div>
        <div className="flex justify-end items-center space-x-4">
          <Button variant="outlined" href={`/novels/${props.issuing_asset.id}`}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Issue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NovelIssuance;
