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
import { Book, PageMeta } from "@/lib/commonInterfaces";
import { Visibility } from "@mui/icons-material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Swal from "sweetalert2";
import { BOOKS } from "@/api";
import { AxiosError } from "axios";
interface Props {
  books: Book[];
  meta: PageMeta;
}
const BookTable = ({ books, meta }: Props) => {
  const router = useRouter();
  const useAxiosWithAuth = useAxiosAuth();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const handleDelete = async (book: Book) => {
    Swal.fire({
      title: "Warning",
      titleText: book.title,
      text: "Do you want to delete this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "red",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        useAxiosWithAuth
          .delete(`${BOOKS}/delete/${book.id}`)
          .then(() => {
            Swal.fire({
              title: "Sucess",
              text: "Book Deleted Successfully",
              icon: "success",
            });
            router.replace("/books");
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
                  Acc#
                </TableCell>
                <TableCell className=" text-white font-bold text-lg">
                  Title
                </TableCell>
                <TableCell className=" text-white font-bold text-lg">
                  Department
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
              {books.map((book, index) => (
                <TableRow
                  className=""
                  key={book.id}
                  sx={{
                    backgroundColor: index % 2 !== 0 ? "#B8DAFF" : "white",
                  }}
                >
                  <TableCell className="">{index + 1}</TableCell>
                  <TableCell className="">{book.acc_no}</TableCell>
                  <TableCell>
                    <Tooltip
                      title={book.is_available ? "Available" : "Not Available"}
                    >
                      <FiberManualRecordIcon
                        color={book.is_available ? "success" : "error"}
                        fontSize="small"
                      />
                    </Tooltip>
                    <span>{book.title}</span>
                    <p>{book.author}</p>
                    <Tooltip title={"ISBN"}>
                      <p className="text-blue-500">{book.isbn_no}</p>
                    </Tooltip>
                    <p className="text-red-500">{book.publisher.name}</p>
                  </TableCell>

                  <TableCell>{book.department.name}</TableCell>
                  <TableCell>{book.location.name}</TableCell>
                  <TableCell>{book.material_type.name}</TableCell>
                  <TableCell>{book.language.name}</TableCell>
                  <TableCell className="">
                    <Tooltip title="View Book">
                      <Button href={`/books/${book.id}`} LinkComponent={Link}>
                        <Visibility />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Edit Book">
                      <Button
                        href={`/books/edit/${book.id}`}
                        LinkComponent={Link}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Book">
                      <Button
                        onClick={() => {
                          handleDelete(book);
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

export default BookTable;
