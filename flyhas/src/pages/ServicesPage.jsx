import React from "react";
import { Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { AirlineSeatReclineNormal, Fastfood, SupportAgent, LocalAirport } from "@mui/icons-material";
import backgroundImage from "../assets/airplane-bg.jpg"; 
import Footer from "../components/Footer";

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Seat Selection",
      icon: <AirlineSeatReclineNormal sx={{ fontSize: 40, color: "#007bff" }} />, 
      options: [
        { name: "Economy Class", description: "In-flight entertainment, reclining seats, and food trays all provided." },
        { name: "Business Class", description: "Leather seats with a massage option, private quarters, complimentary blankets and self-care products." },
      ],
    },
    {
      id: 2,
      title: "Meal Customisation",
      icon: <Fastfood sx={{ fontSize: 40, color: "#007bff" }} />,
      options: [
        { name: "Regular", description: "Wagyu Steak with Black Truffle Sauce and Sticky Toffee Pudding." },
        { name: "Vegetarian", description: "Lettuce and Tofu Kombucha Soup and Peanuts." },
        { name: "Halal", description: "Grilled Lamb Chops and Ahududu Trilece." },
        { name: "Kosher", description: "Potato Latkes and Chocolate Challah." },
      ],
    },
    {
      id: 3,
      title: "Live Customer Support",
      icon: <SupportAgent sx={{ fontSize: 40, color: "#007bff" }} />,
      options: [
        { name: "24/7 Customer Support", description: "Our multilingual team is always here to support you." },
      ],
    },
    {
      id: 4,
      title: "Lounge Services",
      icon: <LocalAirport sx={{ fontSize: 40, color: "#007bff" }} />,
      options: [
        { name: "Priority Lounge Access", description: "Enjoy exclusive lounges with a world-class buffet, PlayStation center, gym, sleeping pods, and shower cabins." },
      ],
    },
  ];

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
            marginLeft: "20px",
          }}
        >
          Our Services
        </Typography>
      </Box>

      {/* Content */}
      <Container sx={{ marginTop: "40px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          <span style={{ color: "#1c3d5a" }}>Explore Our</span>
          <span style={{ color: "#007bff" }}> Premium Services!</span>
        </Typography>
        <Typography variant="body1" paragraph>
          We are dedicated to enhancing your travel experience with top-notch comfort, exquisite meals, and world-class lounges.
        </Typography>

        {/* Service Sections */}
        {services.map((service) => (
          <Box key={service.id} sx={{ mb: 4 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
              {service.icon} {service.title}
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              {service.options.map((option, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {option.name}
                      </Typography>
                      <Typography variant="body2">{option.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Container>

      <Box sx={{ marginTop: "50px", marginBottom: "200px", textAlign: "center" }}></Box>
      
      <Footer />
    </Box>
  );
};

export default ServicesPage;
