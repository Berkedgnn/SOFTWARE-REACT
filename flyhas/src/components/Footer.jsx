import React from "react";
import { Container, Grid, Typography, Link, Box } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, YouTube } from "@mui/icons-material";
import flyhasLogo from "../assets/flyhas-logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <Box sx={{ position: "relative", backgroundColor: "#002D62", color: "#fff", padding: "30px 0", overflow: "hidden" }}>
      {/* Background */}
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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={4} alignItems="flex-start">
          {/* Logo */}
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <img src={flyhasLogo} alt="Flyhas Logo" style={{ width: "180px", marginBottom: "20px" }} />
            </Box>
          </Grid>


          <Grid item xs={12} md={9} container spacing={2}>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" sx={{ color: "#A6CE39", fontStyle: "normal" }}>Corporate</Typography>
              <Box sx={{ marginTop: "8px" }}>
                <Link onClick={() => navigate("/AboutUs")} href="#" color="inherit" display="block" sx={{ fontStyle: "normal", textDecoration: "none" }}>About Us</Link>
                <Link onClick={() => navigate("/VisionMission")} href="#" color="inherit" display="block" sx={{ fontStyle: "normal", textDecoration: "none" }}>Vision & Mission</Link>
                <Link onClick={() => navigate("/OurPolicy")} href="#" color="inherit" display="block" sx={{ fontStyle: "normal", textDecoration: "none" }}>Our Policies</Link>
                <Link onClick={() => navigate("/Services")} href="#" color="inherit" display="block" sx={{ fontStyle: "normal", textDecoration: "none" }}>Services</Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" sx={{ color: "#A6CE39", fontStyle: "normal" }}>Media</Typography>
              <Box sx={{ marginTop: "8px" }}>
                <Link onClick={() => navigate("/Galleries")} href="#" color="inherit" display="block" sx={{ fontStyle: "normal", textDecoration: "none" }}>Gallery</Link>
                <Link onClick={() => navigate("/CityGuide")} href="#" color="inherit" display="block" sx={{ fontStyle: "normal", textDecoration: "none" }}>City Guide</Link>
              </Box>
            </Grid>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" sx={{ color: "#A6CE39", fontStyle: "normal" }}>Contact</Typography>
              <Box sx={{ marginTop: "8px" }}>
                <Link onClick={() => navigate("/BaggageTracking")} href="#" color="inherit" display="block" sx={{ fontStyle: "normal", textDecoration: "none" }}> flyhas@info.com</Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>


        <Box textAlign="center" mt={4}>
          <Typography variant="body2" sx={{ fontStyle: "normal" }}>Follow Us on Social Media</Typography>
          <Box mt={1}>
            <Facebook sx={{ margin: "0 5px" }} />
            <Twitter sx={{ margin: "0 5px" }} />
            <Instagram sx={{ margin: "0 5px" }} />
            <LinkedIn sx={{ margin: "0 5px" }} />
            <YouTube sx={{ margin: "0 5px" }} />
          </Box>
        </Box>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" sx={{ fontStyle: "normal" }}>© 2025 Flyhas. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
