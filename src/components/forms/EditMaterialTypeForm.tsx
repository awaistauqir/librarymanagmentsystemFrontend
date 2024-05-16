import { MATERIALTYPES } from "@/api";
import { MaterialType } from "@/lib/commonInterfaces"; // Assuming this is the correct import for the MaterialType interface
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import trimStrings from "@/lib/stringTrimmer";
import { Button, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { object, string } from "yup";

interface Props {
  materialtype: MaterialType; // Updated prop name
}

const EditMaterialTypeForm = ({ materialtype }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const axiosAuth = useAxiosAuth();
  const schema = object({
    name: string().required("Material Name is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: materialtype.name, // Updated prop name
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(false);
      axiosAuth
        .patch(
          `${MATERIALTYPES}/update/${materialtype.id}`,
          trimStrings(values)
        ) // Updated endpoint
        .then(() => {
          Swal.fire({
            title: "Success",
            text: "MaterialType updated Successfully",
            icon: "success",
          });
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            Swal.fire({
              text: error.response?.data.message || error.message,
              icon: "error",
            });
          }
        });
    },
  });
  return (
    <div className="min-h-[77vh] flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="w-[90%] md:w-[500px] space-y-4 border border-b-2 border-slate-700 rounded-md p-4 shadow-slate-700"
      >
        <h1 className="bg-white text-center text-sky-700 font-bold text-2xl mb-2">
          Edit material type
        </h1>
        <TextField
          size="small"
          id="name"
          label="Name *"
          variant="outlined"
          sx={{ zIndex: 0 }}
          fullWidth
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <div className="flex justify-end items-center space-x-4">
          <Button
            variant="outlined"
            LinkComponent={Link}
            href="/materialtypes"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMaterialTypeForm;
