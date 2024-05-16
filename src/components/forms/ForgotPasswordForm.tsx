import { FORGOT_PASSWORD } from "@/api";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import trimStrings from "@/lib/stringTrimmer";

import { Button, TextField } from "@mui/material";
import { AxiosError } from "axios";
import { useFormik } from "formik";

import Image from "next/image";
import Link from "next/link";

import React from "react";
import Swal from "sweetalert2";
import { object, string } from "yup";

const ForgotPasswordForm = () => {
  const useAxiosWithAuth = useAxiosAuth();
  let formSchema = object({
    email: string()
      .required("Email is required")
      .email("Please enter a valid email"),
  });
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      // Loading State
      useAxiosWithAuth
        .post(FORGOT_PASSWORD, trimStrings(values))
        .then((res) => {
          Swal.fire({
            title: "Sucess",
            text: "Check your email to reset your password",
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
    <div className="min-h-[92vh] flex items-center justify-center bg-gray-50 container mx-auto">
      <section className=" max-w-4xl min-h-full grid grid-cols-1 md:grid-cols-2 space-x-4 border-b-2 border-gray-600 p-4 rounded-2xl">
        <form
          className="gap-3 min-h-full flex flex-col justify-center"
          onSubmit={formik.handleSubmit}
        >
          <h2 className="font-bold text-2xl text-[#002D74] rounded-e-2xl">
            Library Management System
          </h2>
          <h2 className="font-bold text-2xl text-[#002D74]">Forgot Password</h2>
          <div className="border-b-2 border-gray-600 h-1"></div>
          <br />
          <div className="flex flex-col gap-4 min-w-fit ">
            <div className="form-control">
              <TextField
                size="small"
                id="email"
                label="Email *"
                variant="outlined"
                placeholder="john.doe@mail.com"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>

            <Link
              href="/login"
              className="text-sm underline text-gray-700 hover:text-gray-900 text-right"
            >
              Back to Login
            </Link>

            <Button
              className="btn-primary"
              variant="contained"
              type="submit"
              disabled={formik.isSubmitting}
            >
              Send Email
            </Button>
          </div>
        </form>

        <div className="hidden md:block md:flex-[.5] relative min-h-[85vh]">
          <Image
            className="rounded-2xl object-cover"
            src="https://images.unsplash.com/photo-1522211988038-6fcbb8c12c7e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // width={500}
            // height={500}
            fill
            alt="Login Image"
          />
        </div>
      </section>
    </div>
  );
};

export default ForgotPasswordForm;
