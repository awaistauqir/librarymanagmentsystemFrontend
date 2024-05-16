import React from "react";
import LibraryAssetFilter from "@/components/filters/LibraryAssetFilter";
import LibraryAsset from "./LibraryAsset";
import {
  Asset,
  Category,
  Department,
  MaterialType,
  PageMeta,
  Publisher,
  Location,
  Language,
} from "@/lib/commonInterfaces";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
interface Props {
  pagedata: {
    data: Asset[];
    meta: PageMeta;
  };
  category: Category[];
  departments: Department[];
  locations: Location[];
  material_types: MaterialType[];
  publishers: Publisher[];
  languages: Language[];
}
const LibraryAssets = (props: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-sky-950 text-center">
        LibraryAssets
      </h1>
      <div className="">
        <LibraryAssetFilter
          languages={props.languages}
          publishers={props.publishers}
          departments={props.departments}
          categories={props.category}
          material_types={props.material_types}
          locations={props.locations}
        />

        <div className="w-full space-y-4 flex-[.7]">
          {props.pagedata.data.map((asset) => (
            <LibraryAsset key={asset.id} asset={asset} />
          ))}
          <div className="w-full flex justify-between items-center">
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
              count={+props.pagedata.meta.pageCount}
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
      </div>
    </div>
  );
};

export default LibraryAssets;
