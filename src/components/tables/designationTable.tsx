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
import { Designation, PageMeta } from "@/lib/commonInterfaces";
import Swal from "sweetalert2";
import { DESIGNATIONS } from "@/api";
import { AxiosError } from "axios";
interface Props {
  designations: Designation[];
  meta: PageMeta;
}
const LocationTable = ({ designations, meta }: Props) => {
  const router = useRouter();
  const useAxiosWithAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const handleDelete = async (designation: Designation) => {
    Swal.fire({
      title: "Warning",
      titleText: designation.name,
      text: "Do you want to delete this designation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxiosWithAuth
          .delete(`${DESIGNATIONS}/delete/${designation.id}`)
          .then(() => {
            Swal.fire({
              title: "Sucess",
              text: "Designation Deleted Successfully",
              icon: "success",
            });
            router.replace("/designations");
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

              <TableCell
                className=" text-white font-bold text-lg"
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {designations.map((designation, index) => (
              <TableRow
                className=""
                key={designation.id}
                sx={{
                  "&:hover": {
                    background: "#B8DAFF !important",
                  },
                }}
              >
                <TableCell className="">{index + 1}</TableCell>

                <TableCell>{designation.name}</TableCell>

                <TableCell className="" align="right">
                  <Tooltip title="Edit">
                    <Button
                      href={`/designations/edit/${designation.id}`}
                      LinkComponent={Link}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button onClick={() => handleDelete(designation)}>
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
