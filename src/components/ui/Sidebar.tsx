import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { randomBytes } from "crypto";
import Link from "next/link";
import SecurityIcon from "@mui/icons-material/Security";
import { CategoryRounded, LanguageRounded } from "@mui/icons-material";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ComputerIcon from "@mui/icons-material/Computer";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Drawer,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
export default function SwipeableTemporaryDrawer({
  toggleDrawer,
  state,
}: {
  toggleDrawer: React.MouseEventHandler;
  state: boolean;
}) {
  //   const toggleDrawer = () => setState(!state);
  const librarianRoutes = [
    {
      id: randomBytes(5).toString("hex"),
      label: "Languages",
      path: "/languages",
      icon: <LanguageRounded />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Categories",
      path: "/categories",
      icon: <CategoryRounded />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Material Types",
      path: "/materialtypes",
      icon: <CategoryRounded />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Publishers",
      path: "/publishers",
      icon: <CategoryRounded />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Currencies",
      path: "/currencies",
      icon: <PointOfSaleIcon />,
    },
  ];
  const assets = [
    {
      id: randomBytes(5).toString("hex"),
      label: "Books",
      path: "/books",
      icon: <MenuBookIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Magazines",
      path: "/magazines",
      icon: <NewspaperIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Journals",
      path: "/journals",
      icon: <MenuBookIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "EBook",
      path: "/ebooks",
      icon: <ComputerIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Novels",
      path: "/novels",
      icon: <MenuBookIcon />,
    },
  ];
  const adminRoutes = [
    {
      id: randomBytes(5).toString("hex"),
      label: "Users",
      path: "/users",
      icon: <PeopleIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Roles",
      path: "/roles",
      icon: <SecurityIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Departments",
      path: "/departments",
      icon: <SchoolIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Designations",
      path: "/designations",
      icon: <SchoolIcon />,
    },
    {
      id: randomBytes(5).toString("hex"),
      label: "Locations",
      path: "/locations",
      icon: <LocationOnIcon />,
    },
  ];
  const userRoutes = [
    {
      id: randomBytes(5).toString("hex"),
      label: "Library Assets",
      path: "/library_assets",
      icon: <MenuBookIcon />,
    },
  ];

  const session = useSession();
  const userRoles = session?.data?.user?.roles.map((role) => role.name);
  const isAdmin = userRoles?.includes("admin");
  const isLibrarian = userRoles?.includes("librarian");
  const isUser = userRoles?.includes("user");
  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"left"}
          open={state}
          onClose={toggleDrawer}
          // onOpen={toggleDrawer}
        >
          <Box sx={{ width: 250 }} onClick={toggleDrawer}>
            <List>
              {isAdmin &&
                adminRoutes.map((link) => (
                  <ListItem key={link.id} disablePadding>
                    <ListItemButton LinkComponent={Link} href={link.path}>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              {isLibrarian &&
                librarianRoutes.map((link) => (
                  <ListItem key={link.id} disablePadding>
                    <ListItemButton LinkComponent={Link} href={link.path}>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              {isUser &&
                userRoutes.map((link) => (
                  <ListItem key={link.id} disablePadding>
                    <ListItemButton LinkComponent={Link} href={link.path}>
                      <ListItemIcon>{link.icon}</ListItemIcon>
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                ))}

              <Divider />
            </List>
            <Divider />
          </Box>
          {isLibrarian && (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <ListItemText primary="Library Assets" />
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {assets.map((asset) => (
                    <ListItem key={asset.id} disablePadding>
                      <ListItemButton LinkComponent={Link} href={asset.path}>
                        <ListItemIcon>{asset.icon}</ListItemIcon>
                        <ListItemText primary={asset.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          )}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
