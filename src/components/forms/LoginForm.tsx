import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { object, string } from "yup";

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let formSchema = object({
    email: string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: string().required("Password is required"),
  });
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      // Loading State
      setIsLoading(true);

      const res = await signIn("credentials", {
        email: values.email.trim(),
        password: values.password,
        redirect: false,
      });
      if (res?.ok) {
        setIsLoading(false);
        router.replace("/");
      }
      if (res?.error) {
        Swal.fire({ titleText: res.error, icon: "error" });
      }
      setIsLoading(false);
    },

    // Handling Successful Login
    // Handling Errors
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
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
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
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
            <div className="form-control">
              <TextField
                size="small"
                id="password"
                label="Password *"
                variant="outlined"
                placeholder="xxxxxxxx"
                type={showPassword ? "text" : "password"}
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
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Link
                href="/forgotPassword"
                className="text-sm underline text-gray-700 hover:text-gray-900 text-right"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              className="btn-primary"
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              Login
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

export default LoginForm;
