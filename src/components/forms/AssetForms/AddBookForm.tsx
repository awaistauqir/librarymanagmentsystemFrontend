import CustomSelectId from "@/components/dropdown/CustomSelectID";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { SyntheticEvent, useState } from "react";
import { array, date, number, object, string } from "yup";
import { imageSchema } from "@/lib/imageSchema";
import {
  Currency,
  Department,
  Distributor,
  Language,
  Location,
  MaterialType,
  Publisher,
} from "@/lib/commonInterfaces";
import { useSession } from "next-auth/react";

import Swal from "sweetalert2";
import { BOOKS } from "@/api";
import { AxiosError } from "axios";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import dayjs from "dayjs";

enum BookPurchaseStatus {
  PURCHASED = "Purchsased",
  DONATED = "Donated",
  None = "",
}
interface Props {
  publishers: Publisher[];
  distributors: Distributor[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  departments: Department[];
  authors: string[];
  currencies: Currency[];
}
const AddBookFrom = ({
  publishers,
  distributors,
  material_types,
  languages,
  locations,
  departments,
  authors,
  currencies,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<
    string | null | ArrayBuffer
  >(null);

  const [bookPurchaseStatus, setBookPurchaseStatus] = useState<string>(
    BookPurchaseStatus.None
  );
  const session = useSession();

  const handleStatusChange = (event: SyntheticEvent, checked: boolean) => {
    setBookPurchaseStatus((event.target as HTMLInputElement).value);
  };

  const createBookSchema = object().shape({
    file: imageSchema.notRequired(),
    call_no: string().required("Call No is required").max(25),
    title: string().required("Title is required").max(50),
    subTitle: string().max(100),
    author: string().required("Author is required").max(50),
    subAuthor: array().of(string()),
    edition_no: string().max(25),
    ddc_classification_no: string().max(25),
    publisherId: string().required("Publisher is required"),
    distributerId: string().min(1, "Please select a distributor"),
    accompanying_material: string().max(25),
    material_typeId: string().required("Material type is required"),
    isbn_no: string().max(25),
    publishing_year: number()
      .typeError("Please enter a valid year")
      .transform((value, originalValue) =>
        originalValue !== "" ? parseFloat(originalValue) : null
      ),
    date_of_purchase: date()
      .typeError("Please enter a valid date")
      .transform((value, originalValue) =>
        originalValue !== "" ? new Date(originalValue) : null
      ),
    price: number()
      .typeError("Please enter a valid number")
      .min(0, "Price cannot be negative")
      .transform((value, originalValue) =>
        originalValue !== "" ? parseFloat(originalValue) : null
      ),
    currencyId: string().min(1, "Please select currency"),
    total_pages: number()
      .min(1, "Total pages cannot be less than 1")
      .typeError("Please enter a valid number")
      .transform((value, originalValue) =>
        originalValue !== "" ? parseFloat(originalValue) : null
      ),
    languageId: string().required("Please select a language"),
    locationId: string().required("Please Seleet a location"),
    location_placed: string().required("Shelf Location is required").max(100),
    departmentId: string().required("Please select a department"),
    description: string().max(500),
    donated_by: string().max(50),
  });
  const formik = useFormik({
    initialValues: {
      file: null,
      title: "",
      subTitle: "",
      call_no: "",
      author: "",
      subAuthor: [],
      edition_no: "",
      ddc_classification_no: "",
      publisherId: "",
      distributerId: "",
      accompanying_material: "",
      material_typeId: "",
      isbn_no: "",
      publishing_year: 0,
      date_of_purchase: null,
      price: 0,
      currencyId: "",
      total_pages: 0,
      languageId: "",
      locationId: "",
      location_placed: "",
      departmentId: "",
      description: "",
      donated_by: "",
    },
    validationSchema: createBookSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      const axiosAuth = axiosWithAuth(session?.data?.access_token, true);
      const nonEmptyValues = Object.entries(values)
        .filter(([key, value]) => {
          return (
            value !== null &&
            value !== undefined &&
            value !== "" &&
            !(Array.isArray(value) && value.length === 0)
          );
        })
        .reduce((acc: Record<string, any>, [key, value]) => {
          if (typeof value === "string") {
            acc[key] = value.trim();
          } else acc[key] = value;
          return acc;
        }, {});

      if (values.file !== null && (values.file as any) instanceof File) {
        formData.append("file", values.file);
      }
      Object.entries(nonEmptyValues).forEach(([key, value]) => {
        if (key !== "file") {
          formData.append(key, value);
        }
      });

      setLoading(true);

      axiosAuth
        .post(`${BOOKS}/create`, formData)
        .then(() => {
          Swal.fire({
            title: "Success",
            text: "Book Created Successfully",
            icon: "success",
          });
          formik.resetForm();
          setUploadedImage(null);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            Swal.fire({
              text: error.response?.data.message || error.message,
              icon: "error",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div className="space-y-4">
      <form
        onSubmit={formik.handleSubmit}
        className=" space-y-4 border border-b-2 border-slate-700 rounded-md p-4 shadow-slate-700"
      >
        <h1 className="bg-white text-center text-sky-700 font-bold text-2xl mb-2">
          Add Book
        </h1>
        <h1 className="text-md text-gray-700">Upload Book Cover</h1>
        <img
          src={
            (uploadedImage as string) ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/avatar/noImage.jpg`
          }
          alt="No image available"
          className="w-52 h-52"
        />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          htmlFor="upload-image"
          startIcon={<CloudUploadIcon />}
        >
          Upload Image
        </Button>

        <input
          type="file"
          className="hidden"
          id="upload-image"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            formik.setFieldValue("file", file);

            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setUploadedImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            } else {
              setUploadedImage(null);
            }
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            size="small"
            id="title"
            label="Title *"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <TextField
            size="small"
            id="call_no"
            label="Call No. *"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.call_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.call_no && Boolean(formik.errors.call_no)}
            helperText={formik.touched.call_no && formik.errors.call_no}
          />
          <TextField
            size="small"
            id="subTitle"
            label="Sub Title *"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.subTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.subTitle && Boolean(formik.errors.subTitle)}
            helperText={formik.touched.subTitle && formik.errors.subTitle}
          />
          <TextField
            size="small"
            id="isbn_no"
            label="ISBN No."
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.isbn_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.isbn_no && Boolean(formik.errors.isbn_no)}
            helperText={formik.touched.isbn_no && formik.errors.isbn_no}
          />
          <TextField
            size="small"
            id="author"
            label="Author *"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.author && Boolean(formik.errors.author)}
            helperText={formik.touched.author && formik.errors.author}
          />
          <CustomSelectId
            label="Publisher *"
            id="publisherId"
            value={formik.values.publisherId}
            options={publishers}
            onChange={(e: SelectChangeEvent) => {
              formik.setFieldValue(
                "publisherId",
                publishers.find((p) => p.id === e.target.value)?.id
              );
            }}
            error={formik.touched.publisherId ? formik.errors.publisherId : ""}
            errorCondition={
              formik.touched.publisherId && Boolean(formik.errors.publisherId)
            }
          />
          <FormControl fullWidth>
            <InputLabel id="demo-multiple-name-label" className="mt-[-5px]">
              Sub Authors
            </InputLabel>
            <Select
              size="small"
              id="subAuthor"
              multiple
              value={formik.values.subAuthor}
              onChange={(e) => {
                formik.setFieldValue("subAuthor", e.target.value);
              }}
              input={<OutlinedInput label="Sub Authors" />}
              //   MenuProps={MenuProps}
            >
              {authors.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            id="total_pages"
            label="Total Pages"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.total_pages}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.total_pages && Boolean(formik.errors.total_pages)
            }
            helperText={formik.touched.total_pages && formik.errors.total_pages}
          />
          <TextField
            size="small"
            id="edition_no"
            label="Edition No."
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.edition_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.edition_no && Boolean(formik.errors.edition_no)
            }
            helperText={formik.touched.edition_no && formik.errors.edition_no}
          />
          <CustomSelectId
            label="Language *"
            id="languageId"
            value={formik.values.languageId}
            options={languages}
            onChange={(e: SelectChangeEvent) => {
              formik.setFieldValue(
                "languageId",
                languages.find((l) => l.id === e.target.value)?.id
              );
            }}
            error={formik.touched.languageId ? formik.errors.languageId : ""}
            errorCondition={
              formik.touched.languageId && Boolean(formik.errors.languageId)
            }
          />
          <TextField
            size="small"
            id="publishing_year"
            label="Publishing Year"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.publishing_year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.publishing_year &&
              Boolean(formik.errors.publishing_year)
            }
            helperText={
              formik.touched.publishing_year && formik.errors.publishing_year
            }
          />
          <CustomSelectId
            label="Location *"
            id="locationId"
            value={formik.values.locationId}
            options={locations}
            onChange={(e: SelectChangeEvent) => {
              formik.setFieldValue(
                "locationId",
                locations.find((l) => l.id === e.target.value)?.id
              );
            }}
            error={formik.touched.locationId ? formik.errors.locationId : ""}
            errorCondition={
              formik.touched.locationId && Boolean(formik.errors.locationId)
            }
          />
          <TextField
            size="small"
            id="accompanying_material"
            label="Accompanying Material"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.accompanying_material}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.accompanying_material &&
              Boolean(formik.errors.accompanying_material)
            }
            helperText={
              formik.touched.accompanying_material &&
              formik.errors.accompanying_material
            }
          />
          <TextField
            size="small"
            id="location_placed"
            label="Shelf Location"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.location_placed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.location_placed &&
              Boolean(formik.errors.location_placed)
            }
            helperText={
              formik.touched.location_placed && formik.errors.location_placed
            }
          />
          <CustomSelectId
            label="Material Type *"
            id="material_typeId"
            value={formik.values.material_typeId}
            options={material_types}
            onChange={(e: SelectChangeEvent) => {
              formik.setFieldValue(
                "material_typeId",
                material_types.find((m) => m.id === e.target.value)?.id
              );
            }}
            error={
              formik.touched.material_typeId
                ? formik.errors.material_typeId
                : ""
            }
            errorCondition={
              formik.touched.material_typeId &&
              Boolean(formik.errors.material_typeId)
            }
          />
          <CustomSelectId
            label="Department *"
            id="departmentId"
            value={formik.values.departmentId}
            options={departments}
            onChange={(e: SelectChangeEvent) => {
              formik.setFieldValue(
                "departmentId",
                departments.find((d) => d.id === e.target.value)?.id
              );
            }}
            error={
              formik.touched.departmentId ? formik.errors.departmentId : ""
            }
            errorCondition={
              formik.touched.departmentId && Boolean(formik.errors.departmentId)
            }
          />
          <TextField
            size="small"
            id="ddc_classification_no"
            label="DDC Classification Numnber"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.ddc_classification_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.ddc_classification_no &&
              Boolean(formik.errors.ddc_classification_no)
            }
            helperText={
              formik.touched.ddc_classification_no &&
              formik.errors.ddc_classification_no
            }
          />
        </div>
        <div className="">
          <FormControl>
            <FormLabel id="BookPurchaseStatus">Purchase or Donated</FormLabel>
            <RadioGroup
              aria-labelledby="BookPurchaseStatus"
              defaultValue={BookPurchaseStatus.None}
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value={BookPurchaseStatus.PURCHASED}
                control={<Radio />}
                onChange={handleStatusChange}
                checked={bookPurchaseStatus === BookPurchaseStatus.PURCHASED}
                label={"Purchased"}
              />
              <FormControlLabel
                value={BookPurchaseStatus.DONATED}
                control={<Radio />}
                onChange={handleStatusChange}
                checked={bookPurchaseStatus === BookPurchaseStatus.DONATED}
                label="Donated"
              />
            </RadioGroup>
          </FormControl>
          <div>
            {bookPurchaseStatus === BookPurchaseStatus.PURCHASED && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <DatePicker
                      label="Date of purchase"
                      slotProps={{
                        textField: { size: "small", fullWidth: true },
                      }}
                      maxDate={dayjs(Date.now())}
                      value={
                        formik.values.date_of_purchase
                          ? dayjs(formik.values.date_of_purchase)
                          : null
                      }
                      onChange={(value) => {
                        formik.setFieldValue(
                          ".date_of_purchase",
                          value?.toISOString() || Date.now()
                        );
                      }}
                    />
                    <p className="text-red-500 text-sm">
                      {formik.errors.date_of_purchase}
                    </p>
                  </div>
                </LocalizationProvider>
                <CustomSelectId
                  label="Distributer *"
                  id="distributerId"
                  value={formik.values.distributerId}
                  options={distributors}
                  onChange={(e: SelectChangeEvent) => {
                    formik.setFieldValue("distributerId", e.target.value);
                  }}
                  error={
                    formik.touched.distributerId
                      ? formik.errors.distributerId
                      : ""
                  }
                  errorCondition={
                    formik.touched.distributerId &&
                    Boolean(formik.errors.distributerId)
                  }
                />
                <TextField
                  id="price"
                  label="Price"
                  variant="outlined"
                  size="small"
                  sx={{ zIndex: 0 }}
                  fullWidth
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
                <CustomSelectId
                  label="Currency *"
                  id="currencyId"
                  value={formik.values.currencyId}
                  options={currencies}
                  onChange={(e: SelectChangeEvent) => {
                    formik.setFieldValue(
                      "currencyId",
                      currencies.find((c) => c.id === e.target.value)?.id
                    );
                  }}
                  error={
                    formik.touched.currencyId ? formik.errors.currencyId : ""
                  }
                  errorCondition={
                    formik.touched.currencyId &&
                    Boolean(formik.errors.currencyId)
                  }
                />
              </div>
            )}
            {bookPurchaseStatus === BookPurchaseStatus.DONATED && (
              <>
                <TextField
                  id="donated_by"
                  label="Donator"
                  variant="outlined"
                  sx={{ zIndex: 0 }}
                  fullWidth
                  size="small"
                  value={formik.values.donated_by}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.donated_by &&
                    Boolean(formik.errors.donated_by)
                  }
                  helperText={
                    formik.touched.donated_by && formik.errors.donated_by
                  }
                />
                <br />
              </>
            )}
            <br />
            <TextField
              size="medium"
              id="description"
              label="Description"
              variant="outlined"
              sx={{ zIndex: 0 }}
              fullWidth
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              multiline
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </div>
        </div>
        <div className="flex justify-end items-center space-x-4">
          <Button
            variant="outlined"
            LinkComponent={Link}
            href="/books"
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

export default AddBookFrom;
