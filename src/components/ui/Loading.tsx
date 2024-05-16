import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader({ open }: { open: boolean }) {
  return (
    <div>
      <Backdrop open={open} sx={{ zIndex: 1 }}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
