import React from "react";
import { Container, Typography, Box } from "@mui/material";
import backgroundImage from "../assets/airplane-bg.jpg"; //background picture
import Footer from "../components/Footer"

const VisionMissionPage = () => {
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
          Vision & Mission 
        </Typography>
      </Box>

      {/*content writing*/}
      <Container sx={{ marginTop: "40px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
        <span style={{ color: "#1c3d5a" }}>Vision & </span>  
        <span style={{ color: "#007bff" }}> Mission</span>  
        </Typography>
        <Typography variant="body1" paragraph>
        At Flyhas, our goal is to redefine affordable travel with an innovative approach, setting new standards in the aviation industry. We prioritize safety, comfort, and accessibility, striving to add value to the sector while offering our passengers an exceptional travel experience. Guided by our core principles of safe flights, customer satisfaction, operational excellence, and sustainability, we aim to be the smartest choice for travelers. By fostering a culture of collaboration and innovation, we are committed to continuously elevating Flyhas to new heights. Through eco-friendly initiatives, next-generation fleet investments, and sustainable travel solutions, we are dedicated to minimizing our carbon footprint.
        </Typography>
        <Typography variant="body1" paragraph>
        Smart, reliable, and innovative—Flyhas is the airline of the future.

Flyhas is more than just a flight—it’s a seamless and comfortable travel experience. Without compromising on quality, we are committed to providing an affordable yet enjoyable journey for every passenger.
        </Typography>
      </Container>

      <Box sx={{ marginTop: "50px", marginBottom: "200px", textAlign: "center" }}></Box>
      <Footer />
    </Box>
  );
};

export default VisionMissionPage;
