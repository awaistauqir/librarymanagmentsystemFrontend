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
  Checkbox,
} from "@mui/material";
import { boolean, object, string } from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import { Language, Location, MaterialType } from "@/lib/commonInterfaces";
import CustomSelect from "../../dropdown/CustomSelect";

interface Props {
  locations: Location[];
  languages: Language[];
  material_types: MaterialType[];
}
function NovelFilter(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const formSchema = object({
    search: string(),
    location: string(),
    language: string(),
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
      location: Array.isArray(router.query.location)
        ? router.query.location[0] || ""
        : router.query.location || "",
      language: Array.isArray(router.query.language)
        ? router.query.language[0] || ""
        : router.query.language || "",
      material_type: Array.isArray(router.query.material_type)
        ? router.query.material_type[0] || ""
        : router.query.material_type || "",
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
      router.replace(`/journals
      `);
    },
  });

  return (
    <div className="flex flex-col py-4">
      <h1 className="bg-white text-center text-sky-700 font-bold  text-2xl">
        Novels List
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

                <CustomSelect
                  label="Location"
                  id="location"
                  options={props.locations}
                  value={formik.values.location}
                  onChange={(e: SelectChangeEvent) => {
                    formik.setFieldValue("location", e.target.value);
                  }}
                />
                <CustomSelect
                  label="Language"
                  id="language"
                  options={props.languages}
                  value={formik.values.language}
                  onChange={(e: SelectChangeEvent) => {
                    formik.setFieldValue("language", e.target.value);
                  }}
                />
                <CustomSelect
                  label="Material Type"
                  id="material_type"
                  options={props.material_types}
                  value={formik.values.material_type}
                  onChange={(e: SelectChangeEvent) => {
                    formik.setFieldValue("material_type", e.target.value);
                  }}
                />

                <FormControl fullWidth>
                  <InputLabel
                    id="demo-select-small-label"
                    className="mt-[-5px]"
                  >
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
                  <InputLabel
                    id="demo-select-small-label"
                    className="mt-[-5px]"
                  >
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
                    <MenuItem key={Math.random()} value="">
                      <em>None</em>
                    </MenuItem>

                    <MenuItem key={Math.random()} value={"name"}>
                      {"Name"}
                    </MenuItem>
                  </Select>
                </FormControl>
                <div>
                  <label htmlFor="newArrival">New Arrival</label>
                  <Checkbox
                    checked={formik.values.newArrival}
                    id="newArrival"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      formik.setFieldValue(
                        "newArrival",
                        !formik.values.newArrival
                      );
                    }}
                  />
                </div>
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
          href="/novels/add"
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add novel
        </Button>
      </div>
    </div>
  );
}
export default NovelFilter;
