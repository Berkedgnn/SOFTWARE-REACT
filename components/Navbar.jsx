import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import logo from "/src/assets/flyhas.png";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}> 
      <Toolbar>
        {/* LOGO and Title */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <img src={logo} alt="Logo" style={{ width: "90px", height: "90px", marginRight: "30px" }} />
        <Typography variant="h6" sx={{ fontWeight: "300", fontFamily: "'Alfa Slab One', sans-serif", fontSize: "1.5rem", color: "white"  }}>FLYHAS Flight Reservation</Typography>
        </Box>

        {/* Menü Butonu*/}
        <IconButton 
          edge="start" 
          color="inherit" 
          aria-label="menu" 
          onClick={handleMenuOpen} 
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Açılır Menü */}
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose}>Services</MenuItem>
          <MenuItem onClick={handleMenuClose}>City Guide</MenuItem>
        </Menu>

        {/* Menü Öğeleri (Sadece Büyük Ekranlarda) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit">Services</Button>
          <Button color="inherit">City Guide</Button>
          <Button sx={{ backgroundColor: "#001F5B", color: "white", "&:hover": { backgroundColor: "#000E3B" } }}>
  Sign In
</Button>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
