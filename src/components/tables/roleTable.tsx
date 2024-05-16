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
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import Link from "next/link";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import React from "react";
import { Email, Phone } from "@mui/icons-material";

import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { UserData } from "@/lib/UserInterface";
import { Field } from "formik";
import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { USERS } from "@/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { PageMeta, Role } from "@/lib/commonInterfaces";

interface Props {
  data: Role[];
  meta: PageMeta;
}

const RoleTable = ({ data, meta }: Props) => {
  const router = useRouter();
  const useAxiosWithAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((role, index) => (
              <TableRow
                className=""
                key={role.id}
                sx={{
                  backgroundColor: index % 2 !== 0 ? "#B8DAFF" : "white",
                }}
              >
                <TableCell className="">{index + 1}</TableCell>

                <TableCell>{role.name}</TableCell>
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

export default RoleTable;
