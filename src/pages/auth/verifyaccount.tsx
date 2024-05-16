import axios from "axios";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import Swal from "sweetalert2";
import {
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";

import { getSession } from "next-auth/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { VERIFY_EMAIL } from "@/api";

const initialValues = {
  password: "",
  confirm_password: "",
};

function Page() {
  const useAxiosWithAuth = useAxiosAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { query } = router;

  const resetToken = query.resetToken;

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await useAxiosWithAuth.patch(
          `${VERIFY_EMAIL}/${resetToken}`,
          values
        );
        Swal.fire({
          title: "Sucess",
          titleText: "Accound Verified. You can now Log in",
          icon: "success",
        }).then(() => {
          formik.resetForm();
          router.push("/login");
        });
      } catch (e) {
        if (e instanceof axios.AxiosError) {
          Swal.fire({
            title: "Error",
            titleText: e.response?.data.message || e.message,
            icon: "error",
          });
        }
      }
    },
  });
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-fit space-y-4 rounded shadow-stone-950 shadow-sm  p-6 text-stone-900">
          <h2 className="text-center text-2xl">Set Password</h2>
          <div className="flex-grow bg-gray-500 h-[1px]"></div>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col space-y-4 w-96 px-2">
              <div className="form-control">
                <TextField
                  size="small"
                  id="password"
                  label="Password*"
                  variant="outlined"
                  type={`${showPassword ? "text" : "password"}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="form-control">
                <TextField
                  size="small"
                  name="confirm_password"
                  label="Confirm Password*"
                  variant="outlined"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirm_password &&
                    Boolean(formik.errors.confirm_password)
                  }
                  helperText={
                    formik.touched.confirm_password &&
                    formik.errors.confirm_password
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              <Button
                variant="contained"
                className="btn-primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Page;
