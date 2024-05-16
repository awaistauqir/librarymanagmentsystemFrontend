import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

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

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";

function MaterialTypeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const formSchema = object({
    search: string(),
    order: string(),
    orderBy: string(),
  });
  const formik = useFormik({
    initialValues: {
      search: Array.isArray(router.query.search)
        ? router.query.search[0] || ""
        : router.query.search || "",

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

      router.replace(`${pathname}?${params.toString()}`);
    },
    onReset() {
      router.replace("/materialtypes");
    },
  });

  return (
    <div className="flex flex-col py-4">
      <h1 className="bg-white text-center text-sky-700 font-bold  text-2xl">
        MaterialType List
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
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
              <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <InputLabel id="demo-select-small-label">Order By</InputLabel>
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
                  </Select>
                </FormControl>
              </div>
              <div className="flex items-end justify-end space-x-4">
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
          href="/materialtypes/add"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add MaterialType
        </Button>
      </div>
    </div>
  );
}
export default MaterialTypeFilter;
