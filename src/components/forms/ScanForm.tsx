import { BAR_CODE_SEARCH } from "@/api";
import { Asset, IssuedRecord } from "@/lib/commonInterfaces";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import Quagga from "@ericblade/quagga2";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { object, string } from "yup";
interface Data {
  issuedRecord: IssuedRecord;
  record: Asset;
}
const ScanForm = () => {
  const useAxiosWithAuth = useAxiosAuth();
  const [assetDetails, setAssetDetails] = useState<null | Data>(null);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      barcode: "",
    },
    validationSchema: object().shape({
      barcode: string().required("Barcode is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await useAxiosWithAuth.get(
          `${BAR_CODE_SEARCH}/${values.barcode}`
        );

        setAssetDetails(response.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Asset not found!",
        });
      }
    },
  });
  const initQuagga = async () => {
    try {
      if (Quagga) {
        Quagga.stop();
      }
    } catch (error) {
      console.error("Error stopping Quagga:", error);
    }

    try {
      await Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.getElementById("barcode")!,
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment", // or user for the front camera
            },
          },
          decoder: {
            readers: ["code_128_reader", "ean_reader"],
          },
        },
        (err) => {
          if (err) {
            console.error("Error initializing Quagga:", err);
            return;
          }

          Quagga.start();

          Quagga.onDetected((result) => {
            const scannedBarcode = result.codeResult.code;

            formik.setFieldValue("barcode", scannedBarcode);

            Quagga.stop();
          });
        }
      );
    } catch (error) {
      console.error("Error initializing Quagga:", error);
    }
  };

  const handleProceed = () => {
    if (assetDetails) {
      const id = assetDetails.record.id;
      const category = assetDetails.record.category.name;

      Swal.fire({
        icon: "question",
        title: "Proceed?",
        text: "Proceed to the next page?",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          if (category === "Book") {
            router.push(`/books/${id}`);
          }
          if (category === "Magazine") {
            router.push(`/magazines/${id}`);
          }
          if (category === "Journal") {
            router.push(`/journals/${id}`);
          }
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Asset not found!",
      });
    }
  };
  return (
    <div className="p-3 w-full space-y-4">
      <h1 className="text-2xl font-bold text-sky-950 text-center">
        Barcode Scan
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <h1 className="text-lg font-bold">Barcode</h1>
            <TextField
              size="small"
              name="barcode"
              id="barcode"
              fullWidth
              value={formik.values.barcode}
              onChange={formik.handleChange}
              label="Barcode"
              error={formik.touched.barcode && Boolean(formik.errors.barcode)}
              helperText={formik.touched.barcode && formik.errors.barcode}
            />
            <div className="flex justify-end items-center space-x-3">
              <Button variant="contained" onClick={initQuagga}>
                Scan
              </Button>
              <Button variant="contained" type="submit">
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full space-y-4">
        <h1 className="text-lg font-bold">Library Asset Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            size="small"
            fullWidth
            label="Title"
            value={assetDetails?.record.title || ""}
          />
          <TextField
            size="small"
            fullWidth
            label="Category"
            value={assetDetails?.record.category.name || ""}
          />
          <TextField
            size="small"
            fullWidth
            label="Status"
            value={
              assetDetails
                ? assetDetails.record.is_available
                  ? "Available"
                  : "Not Available"
                : ""
            }
          />
        </div>
      </div>
      <div className="w-full space-y-4">
        <h1 className="text-lg font-bold">Borrower Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            size="small"
            fullWidth
            label="Name"
            value={assetDetails?.issuedRecord.borrower.name || ""}
          />
          <TextField
            size="small"
            fullWidth
            label="Department"
            value={assetDetails?.issuedRecord.borrower?.department?.name || ""}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="contained" onClick={handleProceed}>
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default ScanForm;
