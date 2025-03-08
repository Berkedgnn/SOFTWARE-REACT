import React from "react";
import { Container, Typography, Box } from "@mui/material";
import backgroundImage from "../assets/airplane-bg.jpg";
import Footer from "../components/Footer";

const OurPolicies = () => {
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
          sx={{ color: "#001F5B", fontWeight: "bold" }}
        >
          Our Policies
        </Typography>
      </Box>

      {/* Content Section */}
      <Container sx={{ marginTop: "40px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          <span style={{ color: "#1c3d5a" }}>Our</span>
          <span style={{ color: "#007bff" }}> Quality Policy</span>
        </Typography>
        <Typography variant="body1" paragraph>
          At Flyhas, we are committed to maintaining the highest standards in aviation by
          adhering to national and international regulations. Our goal is to
          enhance customer satisfaction through continuous improvement in our
          processes.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ marginTop: "40px" }}>
          <span style={{ color: "#1c3d5a" }}>Our</span>
          <span style={{ color: "#007bff" }}> Safety Policy</span>
        </Typography>
        <Typography variant="body1" paragraph>
          Safety is the foundation of our operations at Flyhas, ensuring the
          well-being of both our passengers and employees. Our senior management
          is dedicated to upholding the highest safety standards, meeting global
          aviation regulations, and continuously improving our Safety Management
          System. Every employee, at all levels, plays an active role in
          maintaining and enhancing safety within our organization.
        </Typography>
        <Typography variant="h6" gutterBottom sx={{ marginTop: "20px" }}>
          Our Core Safety Commitments:
        </Typography>
        <Typography variant="body1" component="ul" sx={{ textAlign: "left", margin: "0 auto", maxWidth: "800px" }}>
          <li>Allocate the necessary financial and human resources to support and strengthen our safety framework.</li>
          <li>Clearly define safety-related responsibilities and authority across all levels of management and staff.</li>
          <li>Provide continuous training to enhance safety awareness and ensure all employees are competent in their roles.</li>
          <li>Integrate human factors principles into operational procedures to optimize safety in the workplace.</li>
          <li>Foster a safety culture that is fair, transparent, and encourages open reporting without fear of retaliation.</li>
          <li>Promote a proactive approach to identifying, assessing, and mitigating operational risks.</li>
          <li>Investigate safety incidents thoroughly, implementing corrective and preventive measures.</li>
          <li>Encourage collaboration in compliance monitoring and incident investigations.</li>
          <li>Regularly monitor, measure, and refine safety performance indicators for continuous enhancement.</li>
          <li>Ensure that all business partners and suppliers uphold Flyhas safety standards.</li>
          <li>Implement fatigue risk management strategies, ensuring that flight crews report fatigue-related concerns.</li>
        </Typography>
      </Container>

      <Box sx={{ marginTop: "50px", marginBottom: "200px", textAlign: "center" }}></Box>
      <Footer />
    </Box>
  );
};

export default OurPolicies;