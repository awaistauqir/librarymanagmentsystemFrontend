import { CHANGE_PASSWORD } from "@/api";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Button, TextField } from "@mui/material";
import { AxiosError } from "axios";

import { useFormik } from "formik";

import React, { useState } from "react";
import Swal from "sweetalert2";

import { object, ref, string } from "yup";

const ChangePasswordForm = () => {
  const axiosAuth = useAxiosAuth();
  const [loading, setLoading] = useState<Boolean>(false);
  let formSchema = object({
    old_password: string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .notOneOf(
        [ref("new_password")],
        "Current Password and new Password cannot be same"
      ),
    new_password: string().required("Password is required"),

    confirmPassword: string()
      .oneOf([ref("new_password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  //   const router = useRouter();

  const formik = useFormik({
    initialValues: { confirmPassword: "", old_password: "", new_password: "" },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setLoading(true);
      axiosAuth
        .patch(CHANGE_PASSWORD, values)
        .then((res) => {
          Swal.fire({
            title: "Success",
            text: "Password Changed Successfully",
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
        })
        .finally(() => setLoading(false));
    },
    // onReset: () => {
    //   formik.setFieldValue("old_password", "");
    //   formik.setFieldValue("new_password", "");
    //   formik.setFieldValue("confirmPassword", "");
    // },
  });

  return (
    <div className="gird place-items-center max-w-fit mx-auto space-y-4 rounded shadow-stone-900 shadow-sm p-6 text-stone-900">
      <h2 className="text-center text-2xl">Change Password</h2>
      <div className=" bg-gray-500 h-[1px]"></div>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-4 w-96 px-2">
          <div>
            <TextField
              size="small"
              id="old_password"
              label="Current Password*"
              variant="outlined"
              type="password"
              fullWidth
              value={formik.values.old_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.old_password &&
                Boolean(formik.errors.old_password)
              }
              helperText={
                formik.touched.old_password && formik.errors.old_password
              }
            />
          </div>
          <div>
            <TextField
              size="small"
              id="new_password"
              label="New Password*"
              variant="outlined"
              type="password"
              fullWidth
              value={formik.values.new_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.new_password &&
                Boolean(formik.errors.new_password)
              }
              helperText={
                formik.touched.new_password && formik.errors.new_password
              }
            />
          </div>
          <div>
            <TextField
              size="small"
              id="confirmPassword"
              label="Confirm Password*"
              variant="outlined"
              type="password"
              fullWidth
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
          </div>

          <Button
            variant="contained"
            className="bg-blue-500"
            type="submit"
            disabled={loading ? true : false}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ChangePasswordForm;
