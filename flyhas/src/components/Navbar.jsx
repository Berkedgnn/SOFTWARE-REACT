import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import logo from "/src/assets/flyhas-logo.png";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#001F5B", position: "relative" }}>
        <Toolbar sx={{ position: "relative", zIndex: 2 }}>
          {/* LOGO and Title */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img src={logo} alt="Logo" style={{ width: "90px", height: "90px", marginRight: "30px" }} />
            <Typography variant="h6" sx={{ fontWeight: "300", fontFamily: "'Alfa Slab One', sans-serif", fontSize: "1.5rem", color: "white" }}>
              FLYHAS Flight Reservation
            </Typography>
          </Box>

          {/* Hamburger Menu Button */}
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ display: { xs: "block", md: "none" } }}>
            <MenuIcon />
          </IconButton>

          {/* Drawer for Small Screens */}
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List sx={{ width: 250 }}>
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemText primary="Services" />
              </ListItem>
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemText primary="City Guide" />
              </ListItem>
              <ListItem button onClick={toggleDrawer(false)}>
                <ListItemText primary="Log In" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>

        {/* Background design */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "60%",
            height: "100%",
            background: "#1976d2",
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
            zIndex: 1,
          }}
        ></Box>

        {/* Menü item */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 2,
            display: { xs: "none", md: "flex" },
            gap: 2,
            padding: "10px 20px",
          }}
        >
          <Button sx={{ color: "white" }}>Services</Button>
          <Button sx={{ color: "white" }}>City Guide</Button>
          <Button
            sx={{
              backgroundColor: "#001F5B",
              color: "white",
              "&:hover": { backgroundColor: "#000E3B" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Login <LoginIcon />
          </Button>
        </Box>
      </AppBar>
    </Box>
  );
};

export default Navbar;
