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
import { Formik, useFormik } from "formik";
import Link from "next/link";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import React, { SyntheticEvent, useState } from "react";
import { array, date, number, object, string } from "yup";
import { imageSchema } from "@/lib/imageSchema";
import {
  Magazine,
  Currency,
  Distributor,
  Language,
  Location,
  MaterialType,
  Publisher,
} from "@/lib/commonInterfaces";
import { useSession } from "next-auth/react";

import Swal from "sweetalert2";
import { MAGAZINES } from "@/api";
import { AxiosError } from "axios";
import { axiosWithAuth } from "@/lib/axiosWithAuth";
import dayjs from "dayjs";

enum MagazinePurchaseStatus {
  PURCHASED = "Purchsased",
  DONATED = "Donated",
  None = "",
}
interface Props {
  magazineRecord: Magazine;
  publishers: Publisher[];
  distributors: Distributor[];
  material_types: MaterialType[];
  languages: Language[];
  locations: Location[];
  currencies: Currency[];
}
const EditMagazineForm = ({
  magazineRecord,
  publishers,
  distributors,
  material_types,
  languages,
  locations,
  currencies,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadedImage, setUploadedImage] = useState<
    string | null | ArrayBuffer
  >(`${process.env.NEXT_PUBLIC_BASE_URL}/${magazineRecord.cover}`);

  const [magazinePurchaseStatus, setMagazinePurchaseStatus] = useState<string>(
    MagazinePurchaseStatus.None
  );
  const session = useSession();

  const handleStatusChange = (event: SyntheticEvent, checked: boolean) => {
    setMagazinePurchaseStatus((event.target as HTMLInputElement).value);
  };

  const createMagazineSchema = object().shape({
    file: imageSchema.notRequired(),
    publishing_date: date()
      .typeError("Please enter a valid date")
      .nullable()
      .transform((value, originalValue) => {
        return originalValue !== null ? new Date(originalValue) : null;
      }),
    title: string().required("Title is required").max(50),
    subTitle: string().max(100),
    publisherId: string().required("Publisher is required"),
    distributerId: string().min(1, "Please select a distributor"),
    material_typeId: string().required("Material type is required"),
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
    description: string().max(500),
    donated_by: string().max(50).nullable(),
    volume_no: string().max(25),
  });
  const formik = useFormik({
    initialValues: {
      file: null,
      title: magazineRecord.title,
      subTitle: magazineRecord.subTitle,
      volume_no: magazineRecord.volume_no,
      edition_no: magazineRecord.edition_no,
      publisherId: magazineRecord.publisher.id,
      distributerId: magazineRecord.distributor?.id,
      material_typeId: magazineRecord.material_type.id,
      version_no: magazineRecord.version_no,
      date_of_purchase: magazineRecord.date_of_purchase,
      price: magazineRecord.price,
      currencyId: magazineRecord.currency?.id,
      total_pages: magazineRecord.total_pages,
      languageId: magazineRecord.language.id,
      locationId: magazineRecord.location.id,
      location_placed: magazineRecord.location_placed,
      description: magazineRecord.description,
      donated_by: magazineRecord.donated_by,
      publishing_date: null,
    },
    validationSchema: createMagazineSchema,
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
        .patch(`${MAGAZINES}/update/${magazineRecord.id}`, formData)
        .then(() => {
          Swal.fire({
            title: "Success",
            text: "Book Updated Successfully",
            icon: "success",
          });

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
          Edit Magazine
        </h1>
        <h1 className="text-md text-gray-700">Upload Magazine Cover</h1>
        <img
          src={
            (uploadedImage as string) ||
            `${process.env.NEXT_PUBLIC_BASE_URL}/${magazineRecord.cover}`
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
              <DatePicker
                label="Publishing Date"
                slotProps={{ textField: { size: "small", fullWidth: true } }}
                maxDate={dayjs(Date.now())}
                value={
                  formik.values.publishing_date
                    ? dayjs(formik.values.publishing_date)
                    : null
                }
                onChange={(value) => {
                  formik.setFieldValue(
                    "publishing_date",
                    value?.toISOString() || Date.now()
                  );
                }}
              />
              <p className="text-red-500 text-sm">
                {formik.errors.publishing_date}
              </p>
            </div>
          </LocalizationProvider>
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
            id="version_no"
            label="Version No"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.version_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.version_no && Boolean(formik.errors.version_no)
            }
            helperText={formik.touched.version_no && formik.errors.version_no}
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
            id="volume_no"
            label="Volume No"
            variant="outlined"
            sx={{ zIndex: 0 }}
            fullWidth
            value={formik.values.volume_no}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.volume_no && Boolean(formik.errors.volume_no)}
            helperText={formik.touched.volume_no && formik.errors.volume_no}
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
          <TextField
            size="small"
            id="location_placed"
            label="Shelf Location *"
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
        </div>
        <div className="">
          <FormControl>
            <FormLabel id="MagazinePurchaseStatus">
              Purchase or Donated
            </FormLabel>
            <RadioGroup
              aria-labelledby="MagazinePurchaseStatus"
              defaultValue={MagazinePurchaseStatus.None}
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value={MagazinePurchaseStatus.PURCHASED}
                control={<Radio />}
                onChange={handleStatusChange}
                checked={
                  magazinePurchaseStatus === MagazinePurchaseStatus.PURCHASED
                }
                label={"Purchased"}
              />
              <FormControlLabel
                value={MagazinePurchaseStatus.DONATED}
                control={<Radio />}
                onChange={handleStatusChange}
                checked={
                  magazinePurchaseStatus === MagazinePurchaseStatus.DONATED
                }
                label="Donated"
              />
            </RadioGroup>
          </FormControl>
          <div>
            {magazinePurchaseStatus === MagazinePurchaseStatus.PURCHASED && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div>
                    <DatePicker
                      label="Purchase Date"
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
                          "date_of_purchase",
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
                  size="small"
                  variant="outlined"
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
            {magazinePurchaseStatus === MagazinePurchaseStatus.DONATED && (
              <>
                <TextField
                  id="donated_by"
                  label="Donator"
                  variant="outlined"
                  size="small"
                  sx={{ zIndex: 0 }}
                  fullWidth
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
            href="/magazines"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditMagazineForm;
