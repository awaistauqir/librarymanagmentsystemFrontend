import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { boolean, object, string } from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Category,
  Department,
  Language,
  Location,
  MaterialType,
  Publisher,
} from "@/lib/commonInterfaces";
import CustomSelect from "../dropdown/CustomSelect";
interface Props {
  categories: Category[];
  languages: Language[];
  publishers: Publisher[];
  material_types: MaterialType[];
  departments: Department[];
  locations: Location[];
}
const LibraryAssetFilter = ({
  categories,
  languages,
  publishers,
  material_types,
  departments,
  locations,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const formSchema = object().shape({
    search: string(),
    department: string(),
    location: string(),
    language: string(),
    publisher: string(),
    material_type: string(),
    order: string(),
    orderBy: string(),
    newArrival: boolean(),
  });
  const formik = useFormik({
    initialValues: {
      search: Array.isArray(router.query.search)
        ? router.query.search[0] || ""
        : router.query.search || "",
      department: Array.isArray(router.query.department)
        ? router.query.department[0] || ""
        : router.query.department || "",
      location: Array.isArray(router.query.location)
        ? router.query.location[0] || ""
        : router.query.location || "",
      language: Array.isArray(router.query.language)
        ? router.query.language[0] || ""
        : router.query.language || "",
      material_type: Array.isArray(router.query.material_type)
        ? router.query.material_type[0] || ""
        : router.query.material_type || "",
      publisher: Array.isArray(router.query.publisher)
        ? router.query.publisher[0] || ""
        : router.query.publisher || "",
      category: Array.isArray(router.query.category)
        ? router.query.category[0] || ""
        : router.query.category || "",
      newArrival: router.query.newArrival
        ? Boolean(+router.query.newArrival)
        : false,
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
        if (typeof value == "boolean") {
          params.set(key, String(Number(value)));
        } else if (value) {
          params.set(key, value.trim());
        } else {
          params.delete(key);
        }
      });

      router.replace(`${pathname}?${params.toString()}`);
    },
    onReset: () => {
      router.replace(`/library_assets
      `);
    },
  });

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <h1 className="bg-white text-center text-sky-700 font-bold text-lg">
            Filters
          </h1>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
              <TextField
                label="Title"
                id="search"
                size="small"
                variant="outlined"
                value={formik.values.search}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
              />
              <CustomSelect
                label="Language"
                id="language"
                options={languages}
                value={formik.values.language}
                onChange={(e: SelectChangeEvent) => {
                  formik.setFieldValue("language", e.target.value);
                }}
                none
              />

              <CustomSelect
                label="Location"
                id="location"
                options={locations}
                value={formik.values.location}
                onChange={(e: SelectChangeEvent) => {
                  formik.setFieldValue("location", e.target.value);
                }}
                none
              />

              <CustomSelect
                label="Category"
                id="category"
                options={categories}
                value={formik.values.category}
                onChange={(e: SelectChangeEvent) => {
                  formik.setFieldValue("category", e.target.value);
                }}
                none
              />
              <CustomSelect
                label="Material Type"
                id="material_type"
                options={material_types}
                value={formik.values.material_type}
                onChange={(e: SelectChangeEvent) => {
                  formik.setFieldValue("material_type", e.target.value);
                }}
                none
              />
              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label" className="mt-[-5px]">
                  Order
                </InputLabel>
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
                  <MenuItem key={Math.random()} value={"ASC"}>
                    {"Ascending"}
                  </MenuItem>
                  <MenuItem key={Math.random()} value={"DESC"}>
                    {"Descending"}
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="demo-select-small-label" className="mt-[-5px]">
                  Order By
                </InputLabel>
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
                  <MenuItem key={Math.random()} value={"name"}>
                    {"Title"}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex items-end justify-end space-x-4">
              <Button variant="contained" type="submit">
                Apply
              </Button>
              <Button variant="outlined" type="reset">
                Reset
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default LibraryAssetFilter;
