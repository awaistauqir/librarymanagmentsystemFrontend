import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import React from "react";
import { Location, PageMeta } from "@/lib/commonInterfaces";
import Swal from "sweetalert2";
import { LOCATIONS } from "@/api";
import { AxiosError } from "axios";
interface Props {
  locations: Location[];
  meta: PageMeta;
}
const LocationTable = ({ locations, meta }: Props) => {
  const router = useRouter();
  const useAxiosWithAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const handleDelete = async (location: Location) => {
    Swal.fire({
      title: "Warning",
      text: "Do you want to delete this location?",
      titleText: location.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxiosWithAuth
          .delete(`${LOCATIONS}/delete/${location.id}`)
          .then(() => {
            Swal.fire({
              title: "Sucess",
              text: "Location Deleted Successfully",
              icon: "success",
            });
            router.replace("/locations");
          })
          .catch((error) => {
            if (error instanceof AxiosError) {
              Swal.fire({
                text: error.response?.data.message || error.message,
                icon: "error",
              });
            }
          });
      }
    });
  };
  return (
    <div className="overflow-x-scroll">
      <TableContainer component={Paper}>
        <Table sx={{ borderRadius: "5px" }}>
          <TableHead className="bg-blue-500 text-white">
            <TableRow className="text-white font-bold text-lg">
              <TableCell className=" text-white font-bold text-lg">
                <span>#</span>
              </TableCell>
              <TableCell className=" text-white font-bold text-lg">
                Name
              </TableCell>
              <TableCell className=" text-white font-bold text-lg">
                Address
              </TableCell>

              <TableCell
                className=" text-white font-bold text-lg"
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map((location, index) => (
              <TableRow
                className=""
                key={location.id}
                sx={{
                  backgroundColor: index % 2 !== 0 ? "#B8DAFF" : "white",
                }}
              >
                <TableCell className="">{index + 1}</TableCell>

                <TableCell>{location.name}</TableCell>
                <TableCell>{location.address}</TableCell>

                <TableCell className="" align="right">
                  <Tooltip title="Edit">
                    <Button
                      href={`/locations/edit/${location.id}`}
                      LinkComponent={Link}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button onClick={() => handleDelete(location)}>
                      <DeleteOutlineIcon />
                    </Button>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between w-full p-4">
        <p>No. of records found: {meta.itemCount}</p>
        <p>Number of Pages: {meta.pageCount}</p>
      </div>
      <div className="flex justify-between items-center p-4">
        <Stack width={200}>
          <FormControl>
            <InputLabel id="rowsPerPageLabel">Rows Per Page</InputLabel>
            <Select
              labelId="rowsPerPageLabel"
              id="take"
              name="take"
              label="Rows Per Page"
              defaultValue="10"
              onChange={(event: SelectChangeEvent) => {
                // setRows(+event.target.value);
                params.set("take", event.target.value);
                router.replace(`${pathname}?${params.toString()}`);
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Pagination
          count={+meta.pageCount}
          showFirstButton
          showLastButton
          defaultPage={1}
          onChange={(e, page) => {
            params.set("page", String(page));
            router.replace(`${pathname}?${params.toString()}`);
          }}
        />
      </div>
    </div>
  );
};

export default LocationTable;
