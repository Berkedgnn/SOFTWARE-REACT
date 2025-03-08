import React from "react";
import { Container, Grid, Typography, Box, Card, CardContent } from "@mui/material";

const CityGuidePage = () => {
    const tours = [
        { id: 1, name: "Historical District Tour", description: "Relive the past as you walk through each destination's rich, vibrant, historical district" },
        { id: 2, name: "Market Tour", description: "Explore the bustling, colourful flea markets and bazaars the world has to offer" },
        { id: 3, name: "Nightlife Tour", description: "Traverse through pubs and clubs, but make sure to hold on to your wallet and cup!" },
    ];

    const transports = [
        { id: 1, name: "VIP Travel Bus", description: "With our Mercedes Tourismo buses, comfort is guaranteed" },
        { id: 2, name: "Luxury Van", description: "For those seeking privacy, Mercedes vans are available round the clock." },
    ];

    const attractions = [
        { id: 1, name: "Museums!", description: "Admire the cultural treasures, artefacts, statues and art of the greatest civilisations, including the Mesopotamian, Hittite, Greek and Roman." },
        { id: 2, name: "Archaeological Site Tour", description: "Visit the wondrous ruins of ancient cities, settlements and imperial palaces recorded in tales and ancient text!" },
    ];

    const dining = [
        { id: 1, name: "Fine Dining", description: "Enjoy a visit to the country's top restaurants, rewarded by Michelin." },
        { id: 2, name: "Street Food", description: "Set out on an adventure and taste the local cuisine among the locals." },
    ];

    return (
        <Box
            sx={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: 0,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, mt: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                backgroundColor: "white",
                                borderRadius: 4,
                                padding: 3,
                            }}
                        >
                            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
                                City Guide
                            </Typography>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Local Tour Guides
                                </Typography>
                                <Grid container spacing={2}>
                                    {tours.map((tour) => (
                                        <Grid item xs={12} key={tour.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {tour.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {tour.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    VIP Transportation
                                </Typography>
                                <Grid container spacing={2}>
                                    {transports.map((transport) => (
                                        <Grid item xs={12} key={transport.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {transport.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {transport.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Museums & Archaeological Sites
                                </Typography>
                                <Grid container spacing={2}>
                                    {attractions.map((attraction) => (
                                        <Grid item xs={12} key={attraction.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {attraction.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {attraction.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Fine Dining & Resorts
                                </Typography>
                                <Grid container spacing={2}>
                                    {dining.map((dine) => (
                                        <Grid item xs={12} key={dine.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {dine.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {dine.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CityGuidePage;