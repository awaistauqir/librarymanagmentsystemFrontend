import { BASE_AVATAR } from "@/api";
import { Asset } from "@/lib/commonInterfaces";
import { Chip } from "@mui/material";
import React from "react";
interface Props {
  asset: Asset;
}
const LibraryAsset = ({ asset }: Props) => {
  return (
    <div className="w-full border-gray-400 shadow-md rounded-lg flex items-center justify-start">
      <img
        src={
          asset.cover
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/${asset.cover}`
            : BASE_AVATAR
        }
        alt=""
        className="w-52"
      />
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <h1 className="text-xl font-semibold text-sky-950">
            Title: {asset.title}
          </h1>
          <h1 className="text-lg font-semibold text-gray-600">
            Publisher: {asset.publisher.name}
          </h1>
        </div>
        <div className="flex space-x-4">
          <Chip label={asset.category.name} color="primary" />
          {asset.location && (
            <Chip label={asset.location.name} color="primary" />
          )}
          <Chip label={asset.language.name} color="primary" />
          <Chip label={asset.publisher.name} color="primary" />
          <Chip
            label={asset.is_available ? "Avaiable" : "Not Available"}
            color={asset.is_available ? "success" : "error"}
          />
        </div>
      </div>
    </div>
  );
};

export default LibraryAsset;
