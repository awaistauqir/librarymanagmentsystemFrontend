import { useFormik } from "formik";
import React from "react";
import { array, number, object, string } from "yup";
import CustomSelect from "../dropdown/CustomSelect";
import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Department, Designation, Role } from "@/lib/commonInterfaces";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { USERS } from "@/api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import trimStrings from "@/lib/stringTrimmer";
interface Props {
  roles: Role[];
  departments: Department[];
  designations: Designation[];
}
const AddUserForm = (props: Props) => {
  const router = useRouter();

  const axiosAuth = useAxiosAuth();
  let userSchema = object({
    name: string()
      .required("Name is required")
      .matches(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Name can only contain alphabets and space"
      ),
    email: string()
      .trim()
      .email("Please enter a valid email")
      .required("Email is required"),
    phone: string()
      .required("Phone is required")
      .matches(/^\d+$/, "Only numbers are allowed")
      .min(11, "Minimum 11 characters long"),
    tel_ext: string()
      .matches(/^\d+$/, "Only numbers are allowed")
      .min(1, "Minimum 1 characters long"),
    employee_id: string()
      .required("Employee Id is required")
      .matches(/^\d+$/, "Only numbers are allowed")
      .min(1, "Minimum 1 characters long"),
    roleIds: array()
      .of(string())
      .min(1, "Please select at least one role")
      .required(),
    departmentId: string().required("Department is required"),
    designationId: string().required("Designation is required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      employee_id: "",
      tel_ext: "",
      roleIds: [] as string[],
      departmentId: "",
      designationId: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      axiosAuth
        .post(`${USERS}/create/`, trimStrings(values))
        .then((res) =>
          Swal.fire({
            title: "Sucess",
            titleText: "User Created Succesfully",
            icon: "success",
          }).then(() => {
            router.push("/users");
          })
        )
        .catch((err: AxiosError) => Swal.fire(err.message));
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" shadow-sm shadow-slate-700 border border-gray-300 rounded-lg space-y-4 p-4"
    >
      <h1 className="bg-white text-center text-sky-700 font-bold text-2xl mb-2">
        Create User
      </h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextField
          size="small"
          id="email"
          label="Email *"
          variant="outlined"
          sx={{ zIndex: 0 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          size="small"
          id="name"
          label="Name *"
          variant="outlined"
          sx={{ zIndex: 0 }}
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          size="small"
          id="phone"
          label="Phone *"
          variant="outlined"
          sx={{ zIndex: 0 }}
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          size="small"
          id="tel_ext"
          label="Telephone Extension *"
          variant="outlined"
          sx={{ zIndex: 0 }}
          value={formik.values.tel_ext}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tel_ext && Boolean(formik.errors.tel_ext)}
          helperText={formik.touched.tel_ext && formik.errors.tel_ext}
        />

        <CustomSelect
          id="departmentId"
          label="Department"
          options={props.departments}
          value={
            props.departments.find(
              (department) => department.id === formik.values.departmentId
            )?.name as string
          }
          onChange={(event: SelectChangeEvent) => {
            formik.setFieldValue(
              "departmentId",
              props.departments.find(
                (department) => event.target.value === department.name
              )?.id || ""
            );
          }}
          error={formik.errors.departmentId}
        />
        <CustomSelect
          id="designationId"
          label="Designation"
          options={props.designations}
          value={
            (props.designations.find(
              (designation) => designation.id === formik.values.designationId
            )?.name as string) || ""
          }
          onChange={(event: SelectChangeEvent) => {
            formik.setFieldValue(
              "designationId",
              props.designations.find(
                (designation) => event.target.value === designation.name
              )?.id
            );
          }}
          error={formik.errors.designationId}
        />

        <FormControl size="small">
          <InputLabel
            error={formik.touched.roleIds && Boolean(formik.errors.roleIds)}
          >
            Roles *
          </InputLabel>
          <Select
            size="small"
            autoComplete="off"
            error={formik.touched.roleIds && Boolean(formik.errors.roleIds)}
            // helperText={formik.touched.roleIds && formik.errors.roleIds}
            id="roleIds"
            name="roleIds"
            multiple
            value={formik.values.roleIds}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Roles"
            input={<OutlinedInput label="Roles" />}
            renderValue={(selected) => (
              <>
                {selected.map((item) => (
                  <span key={item}>
                    {`${props.roles.find((role) => item === role.id)?.name}, `}
                  </span>
                ))}
              </>
            )}
          >
            {props.roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                <Checkbox checked={formik.values.roleIds.includes(role.id)} />
                <ListItemText primary={role.name} />
              </MenuItem>
            ))}
          </Select>
          {formik.touched.roleIds && formik.errors.roleIds && (
            <p className="text-sm text-red-500">{formik.errors.roleIds}</p>
          )}
        </FormControl>
        <TextField
          size="small"
          id="employee_id"
          label="Employee ID *"
          variant="outlined"
          sx={{ zIndex: 0 }}
          value={formik.values.employee_id}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.employee_id && Boolean(formik.errors.employee_id)
          }
          helperText={formik.touched.employee_id && formik.errors.employee_id}
        />
      </div>
      <div className="flex justify-end items-center space-x-4">
        <Button variant="outlined" onClick={() => router.push("/users")}>
          Cancel
        </Button>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
};

export default AddUserForm;
