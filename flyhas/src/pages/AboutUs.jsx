import React from "react";
import { Container, Typography, Box } from "@mui/material";
import backgroundImage from "../assets/airplane-bg.jpg"; //background picture
import sampleVideo from "../assets/flyhasV.mp4"; //video
import Footer from "../components/Footer"

const AboutUs = () => {
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
        <Typography
          variant="h4"
          sx={{ 
            color: "#001F5B", 
            textAlign: "left", 
            fontWeight: "bold",
            marginLeft: "20px" }}
        >
          About Us
        </Typography>
      </Box>

      {/*content writing*/}
      <Container sx={{ marginTop: "40px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
        <span style={{ color: "#1c3d5a" }}>Welcome to</span>  
        <span style={{ color: "#007bff" }}> Flyhas!</span>  
        </Typography>
        <Typography variant="body1" paragraph>
          We are committed to providing the best flight reservation experience. Our mission is to connect travelers 
          with their destinations in the most seamless way possible.
        </Typography>
        <Typography variant="body1" paragraph>
          With a user-friendly interface and top-notch customer support, we ensure a stress-free journey.
        </Typography>
      </Container>

      {/*Continuous Playing Video*/}
      <Box sx={{ marginTop: "50px", textAlign: "center" }}>
        <video width="80%" autoPlay loop muted>
          <source src={sampleVideo} type="video/mp4" />
         
        </video>
      </Box>
      <Box sx={{ marginTop: "50px", marginBottom: "200px", textAlign: "center" }}></Box>
      <Footer />
    </Box>
  );
};

export default AboutUs;
