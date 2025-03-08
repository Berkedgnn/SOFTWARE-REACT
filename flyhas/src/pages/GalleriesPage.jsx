import React from "react";
import backgroundImage from "../assets/airplane-bg.jpg"; //background picture
import { Container, Typography, Box, Grid } from "@mui/material";
import Footer from "../components/Footer";
import gallery1 from "../assets/gallery1.png";
import gallery2 from "../assets/gallery2.png";
import gallery3 from "../assets/gallery3.png";
import gallery4 from "../assets/gallery4.png";
import gallery5 from "../assets/gallery5.png";
import gallery6 from "../assets/gallery6.png";

const GalleriesPage = () => {
  const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  return (
    <Box>
      {/* Background */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" sx={{ color: "#001F5B", fontWeight: "bold" }}>
          Gallery
        </Typography>
      </Box>

      {/* Image Grid Section */}
      <Container sx={{ marginTop: "40px", textAlign: "center" }}>
        <Grid container spacing={4} justifyContent="center">
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                component="img"
                src={image}
                alt={`Gallery Image ${index + 1}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: 3,
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ marginTop: "50px", marginBottom: "100px", textAlign: "center" }}></Box>
      <Footer />
    </Box>
  );
};

export default GalleriesPage;