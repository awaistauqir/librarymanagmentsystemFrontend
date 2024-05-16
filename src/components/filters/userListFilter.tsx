import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Department, Designation, Role } from "@/lib/commonInterfaces";
import CustomSelect from "../dropdown/CustomSelect";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
interface Props {
  roles: Role[];
  departments: Department[];
  designations: Designation[];
}
function UserFilter(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const formSchema = object({
    search: string(),
    role: string(),
    department: string(),
    designation: string(),
    order: string(),
    orderBy: string(),
  });
  const formik = useFormik({
    initialValues: {
      search: Array.isArray(router.query.search)
        ? router.query.search[0] || ""
        : router.query.search || "",
      roles: Array.isArray(router.query.role)
        ? router.query.role[0] || ""
        : router.query.role || "",
      department: Array.isArray(router.query.department)
        ? router.query.department[0] || ""
        : router.query.department || "",
      designation: Array.isArray(router.query.designation)
        ? router.query.designation[0] || ""
        : router.query.designation || "",
      status: ``,
      orderBy: Array.isArray(router.query.orderBy)
        ? router.query.orderBy[0] || ""
        : router.query.orderBy || "name",
      order: Array.isArray(router.query.order)
        ? router.query.order[0] || ""
        : router.query.order || "ASC",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          params.set(key, value.trim());
        } else {
          params.delete(key);
        }
      });

      params.set(
        "status",
        values.status === "0" || values.status === "1" ? values.status : ""
      );

      router.replace(`${pathname}?${params.toString()}`);
    },
    onReset() {
      router.replace("/users");
    },
  });

  return (
    <div className="flex flex-col py-4">
      <h1 className="bg-white text-center text-sky-700 font-bold  text-2xl">
        Users List
      </h1>
      <div className="p-4 flex justify-center ">
        <Accordion className="w-full">
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h1 className="font-bold text-lg">Filter</h1>
          </AccordionSummary>
          <AccordionDetails>
            <form
              className="space-y-4"
              onSubmit={formik.handleSubmit}
              onReset={formik.handleReset}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  label="Name"
                  id="search"
                  size="small"
                  variant="outlined"
                  value={formik.values.search}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                />
                <CustomSelect
                  label="Roles"
                  id="role"
                  onChange={(event: SelectChangeEvent) => {
                    formik.setFieldValue("roles", event.target.value);
                  }}
                  options={props.roles}
                  value={formik.values.roles}
                  none
                />

                <CustomSelect
                  label="Department"
                  id="department"
                  onChange={(event: SelectChangeEvent) => {
                    formik.setFieldValue("department", event.target.value);
                  }}
                  options={props.departments}
                  value={formik.values.department}
                  none
                />
                <CustomSelect
                  label="Designation"
                  id="designation"
                  onChange={(event: SelectChangeEvent) => {
                    formik.setFieldValue("designation", event.target.value);
                  }}
                  options={props.designations}
                  value={formik.values.designation}
                  none
                />

                <FormControl fullWidth>
                  <InputLabel
                    id="demo-select-small-label"
                    className="mt-[-5px]"
                  >
                    Status
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-select-small-label"
                    id="role"
                    value={formik.values.status}
                    label="Status"
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("status", event.target.value);
                    }}
                  >
                    <MenuItem key={Math.random()} value="">
                      <em>None</em>
                    </MenuItem>

                    <MenuItem key={Math.random()} value={"1"}>
                      {"Active"}
                    </MenuItem>
                    <MenuItem key={Math.random()} value={"0"}>
                      {"Blocked"}
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="demo-select-small-label">Order</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="order"
                    size="small"
                    value={formik.values.order}
                    label="Order"
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("order", event.target.value);
                    }}
                  >
                    <MenuItem key={Math.random()} value="">
                      <em>None</em>
                    </MenuItem>

                    <MenuItem key={Math.random()} value={"ASC"}>
                      {"Ascending"}
                    </MenuItem>
                    <MenuItem key={Math.random()} value={"DESC"}>
                      {"Descending"}
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="demo-select-small-label">Order</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="orderBy"
                    size="small"
                    value={formik.values.orderBy}
                    label="Order By"
                    onChange={(event: SelectChangeEvent) => {
                      formik.setFieldValue("orderBy", event.target.value);
                    }}
                  >
                    <MenuItem key={Math.random()} value="">
                      <em>None</em>
                    </MenuItem>

                    <MenuItem key={Math.random()} value={"name"}>
                      {"Name"}
                    </MenuItem>
                    <MenuItem key={Math.random()} value={"department"}>
                      {"Department"}
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex justify-end items-center space-x-4">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
                <Button variant="outlined" type="reset">
                  Reset
                </Button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="flex items-end justify-end">
        <Button
          LinkComponent={Link}
          href="/users/add"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add User
        </Button>
      </div>
    </div>
  );
}
export default UserFilter;
