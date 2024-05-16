import { LANGUAGES } from "@/api";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import trimStrings from "@/lib/stringTrimmer";
import { Button, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { object, string } from "yup";

const AddLanguagesForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const axiosAuth = useAxiosAuth();
  const schema = object({
    name: string().required("Language Name is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setLoading(false);
      axiosAuth
        .post(`${LANGUAGES}/create`, trimStrings(values))
        .then(() => {
          Swal.fire({
            title: "Sucess",
            text: "Language Created Successfully",
            icon: "success",
          });
          formik.resetForm();
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
          Add Language
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
            href="/languages"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLanguagesForm;
