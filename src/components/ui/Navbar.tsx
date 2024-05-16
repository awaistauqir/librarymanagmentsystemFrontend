import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar, Divider, IconButton, ListItemIcon } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import Link from "next/link";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const username = session.data?.user.username;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    setAnchorEl(null);
    signOut();
    // router.replace("/login");
  };

  return (
    <>
      {isSidebarOpen && (
        <Sidebar
          toggleDrawer={() => setIsSidebarOpen(!isSidebarOpen)}
          state={isSidebarOpen}
        />
      )}
      <header className="bg-blue-500 sticky top-0 left-0  py-2 w-full z-[1000]">
        <div className="flex items-center justify-start">
          <div className="container mx-auto p-0">
            <div className="flex font-bold text-white justify-between items-center h-full">
              <div className="flex space-x-4">
                <button
                  className=""
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <MenuIcon className="text-white" />
                </button>
                <Link
                  href={"/"}
                  className="flex space-x-3 justify-center items-center"
                >
                  <img src="/logo.svg" alt="logo" className="w-11 h-11" />
                  <h1 className="text-xl text-white">LMS</h1>
                </Link>
              </div>
              <div className="space-x-3">
                {session.status === "authenticated" &&
                  session.data.user.roles
                    .map((r) => r.name)
                    .includes("librarian") && (
                    <IconButton LinkComponent={Link} href="/scan">
                      <DocumentScannerIcon
                        className="text-white"
                        fontSize="large"
                      />
                    </IconButton>
                  )}
                <IconButton onClick={handleClick}>
                  <Avatar style={{ padding: 0, margin: 0 }}>
                    {username ? username[0] : ""}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href={"/changePassword"}>Change Password</Link>
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={logoutHandler}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
