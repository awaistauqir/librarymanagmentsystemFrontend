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

import { useRouter } from "next/router";
import { usePathname, useSearchParams } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { USERS } from "@/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

interface Props {
  users: UserData[];
  count: number;
  pageCount: number;
}

const UserTable = ({ users, count, pageCount }: Props) => {
  const router = useRouter();
  const useAxiosWithAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const handleDelete = async (user: UserData) => {
    Swal.fire({
      title: "Warning",
      titleText: "Delete User",
      text: `Do you want to delete this User: '${user.name}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxiosWithAuth
          .delete(`${USERS}/delete/${user.id}`)
          .then(() => {
            Swal.fire({
              title: "Sucess",
              text: "User Deleted Successfully",
              icon: "success",
            });
            router.replace("/users");
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
                User
              </TableCell>
              <TableCell className=" text-white font-bold text-lg">
                Role
              </TableCell>
              <TableCell className=" text-white font-bold text-lg">
                Department
              </TableCell>
              <TableCell className=" text-white font-bold text-lg">
                Status
              </TableCell>
              <TableCell className=" text-white font-bold text-lg">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                className=""
                key={user.id}
                sx={{
                  "&:hover": {
                    background: "#B8DAFF !important",
                  },
                }}
              >
                <TableCell className="">{index + 1}</TableCell>
                <TableCell>
                  <p className="flex items-center justify-start text-blue-500 font-light">
                    <Person2OutlinedIcon className="h-5" />
                    {user.name}
                    <Tooltip title="Employee ID">
                      <span>({user.employee_id})</span>
                    </Tooltip>
                  </p>
                  <p className="text-emerald-600 ">
                    <Email className="h-5" />
                    <span>{user.email}</span>
                  </p>
                  <p className="text-indigo-700 ">
                    <Phone className="h-5" />
                    <span>{user.phone}</span>
                  </p>
                  <Tooltip title="Phone Extension">
                    <p className="text-indigo-700 ">
                      <PhoneForwardedIcon className="h-5" />
                      <span>{user.tel_ext}</span>
                    </p>
                  </Tooltip>
                </TableCell>
                <TableCell className="">
                  {user.roles.map((role) => role.name).join(", ")}
                </TableCell>
                <TableCell>{user.department.name}</TableCell>
                <TableCell className="">
                  <Switch
                    checked={user.is_active}
                    onChange={async () => {
                      try {
                        const res = await useAxiosWithAuth.get(
                          `${USERS}/activation/${user.id}`
                        );
                        router.replace(window.location.href, undefined, {
                          scroll: false,
                        });
                      } catch (e: any) {
                        if (e instanceof AxiosError)
                          Swal.fire({
                            text: e.response?.data.message,
                            icon: "error",
                          });
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="">
                  <Tooltip title="Edit User">
                    <Button
                      href={`/users/edit/${user.id}`}
                      LinkComponent={Link}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete User">
                    <Button
                      onClick={() => {
                        handleDelete(user);
                      }}
                    >
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
        <p>No. of records found: {count}</p>
        <p>Number of Pages: {pageCount}</p>
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
          count={+pageCount}
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

export default UserTable;
