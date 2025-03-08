import React from "react";
import { Container, Grid, Typography, Box, Card, CardContent, Divider } from "@mui/material";
import { TravelExplore, DirectionsBusFilled, Museum, Restaurant, LocationOn, Email, Phone } from "@mui/icons-material";
import backgroundImage from "../assets/airplane-bg.jpg"; 
import Footer from "../components/Footer";

const CityGuidePage = () => {
    const sections = [
        {
            id: 1,
            title: "Local Tour Guides",
            icon: <TravelExplore sx={{ fontSize: 40, color: "#007bff" }} />,
            items: [
                { name: "Historical District Tour", description: "Relive the past as you walk through each destination's rich, vibrant, historical district." },
                { name: "Market Tour", description: "Explore the bustling, colourful flea markets and bazaars the world has to offer." },
                { name: "Nightlife Tour", description: "Traverse through pubs and clubs, but make sure to hold on to your wallet and cup!" },
            ],
        },
        {
            id: 2,
            title: "VIP Transportation",
            icon: <DirectionsBusFilled sx={{ fontSize: 40, color: "#007bff" }} />,
            items: [
                { name: "VIP Travel Bus", description: "With our Mercedes Tourismo buses, comfort is guaranteed." },
                { name: "Luxury Van", description: "For those seeking privacy, Mercedes vans are available round the clock." },
            ],
        },
        {
            id: 3,
            title: "Museums & Archaeological Sites",
            icon: <Museum sx={{ fontSize: 40, color: "#007bff" }} />,
            items: [
                { name: "Museums!", description: "Admire the cultural treasures, artefacts, statues, and art of the greatest civilisations, including the Mesopotamian, Hittite, Greek, and Roman." },
                { name: "Archaeological Site Tour", description: "Visit the wondrous ruins of ancient cities, settlements and imperial palaces recorded in tales and ancient texts!" },
            ],
        },
        {
            id: 4,
            title: "Fine Dining & Resorts",
            icon: <Restaurant sx={{ fontSize: 40, color: "#007bff" }} />,
            items: [
                { name: "Fine Dining", description: "Enjoy a visit to the country's top restaurants, rewarded by Michelin." },
                { name: "Street Food", description: "Set out on an adventure and taste the local cuisine among the locals." },
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
                    City Guide
                </Typography>
            </Box>

            {/* Content */}
            <Container sx={{ marginTop: "40px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    <span style={{ color: "#1c3d5a" }}>Discover the Best of</span>
                    <span style={{ color: "#007bff" }}> Your Destination!</span>
                </Typography>
                <Typography variant="body1" paragraph>
                    Our city guide offers top-notch recommendations for exploring, dining, and traveling in style.
                </Typography>

                {/* Section Rendering */}
                {sections.map((section) => (
                    <Box key={section.id} sx={{ mb: 6 }}>
                        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                            {section.icon} {section.title}
                        </Typography>
                        <Grid container spacing={3} justifyContent="center">
                            {section.items.map((item, index) => (
                                <Grid item xs={12} md={6} key={index}>
                                    <Card sx={{ padding: "10px", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2">{item.description}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Divider sx={{ my: 4 }} /> {/* Bölümler arası boşluk */}
                    </Box>
                ))}
            </Container>

           
      <Box sx={{ marginTop: "50px", marginBottom: "100px", textAlign: "center" }}></Box>
      <Footer />
    </Box>
    );
};

export default CityGuidePage;
