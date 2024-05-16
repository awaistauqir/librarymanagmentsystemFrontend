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
import { Journal, PageMeta } from "@/lib/commonInterfaces";
import { Visibility } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { JOURNALS } from "@/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
interface Props {
  journals: Journal[];
  meta: PageMeta;
}
const JournalTable = ({ journals, meta }: Props) => {
  const router = useRouter();
  const useAxiosWithAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const handleDelete = async (journal: Journal) => {
    Swal.fire({
      title: "Warning",
      titleText: journal.title,
      text: "Do you want to delete this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxiosWithAuth
          .delete(`${JOURNALS}/delete/${journal.id}`)
          .then(() => {
            Swal.fire({
              title: "Sucess",
              text: "Book Deleted Successfully",
              icon: "success",
            });
            router.replace("/journals");
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
    <div className="max-w-screen">
      <div className="overflow-x-scroll">
        <TableContainer component={Paper}>
          <Table sx={{ borderRadius: "5px" }}>
            <TableHead className="bg-blue-500 text-white">
              <TableRow className="!text-white !font-bold !text-lg">
                <TableCell className=" text-white font-bold text-lg">
                  <span>#</span>
                </TableCell>
                <TableCell className=" text-white font-bold text-lg">
                  Title
                </TableCell>
                <TableCell className=" text-white font-bold text-lg">
                  Location
                </TableCell>
                <TableCell className=" text-white font-bold text-lg">
                  Material Type
                </TableCell>
                <TableCell className=" text-white font-bold text-lg">
                  Language
                </TableCell>
                <TableCell className=" text-white font-bold text-lg">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journals.map((journal, index) => (
                <TableRow
                  className=""
                  key={journal.id}
                  sx={{
                    backgroundColor: index % 2 !== 0 ? "#B8DAFF" : "white",
                  }}
                >
                  <TableCell className="">{index + 1}</TableCell>

                  <TableCell>
                    <Tooltip
                      title={
                        journal.is_available ? "Available" : "Not Available"
                      }
                    >
                      <FiberManualRecordIcon
                        color={journal.is_available ? "success" : "error"}
                        fontSize="small"
                      />
                    </Tooltip>
                    <span>{journal.title}</span>
                    <p>{journal.author}</p>
                    <Tooltip title={"ISBN"}>
                      <p className="text-blue-500">{journal.isbn_no}</p>
                    </Tooltip>
                    <p className="text-red-500">{journal.publisher.name}</p>
                  </TableCell>

                  <TableCell>{journal.location.name}</TableCell>
                  <TableCell>{journal.material_type.name}</TableCell>
                  <TableCell>{journal.language.name}</TableCell>
                  <TableCell className="">
                    <Tooltip title="View Journal">
                      <Button
                        href={`/journals/${journal.id}`}
                        LinkComponent={Link}
                      >
                        <Visibility />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Edit Journal">
                      <Button
                        href={`/journals/edit/${journal.id}`}
                        LinkComponent={Link}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Book">
                      <Button
                        onClick={() => {
                          handleDelete(journal);
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
      </div>
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

export default JournalTable;
