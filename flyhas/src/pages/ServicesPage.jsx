import React from "react";
import { Container, Grid, Typography, Box, Card, CardContent } from "@mui/material";

const ServicesPage = () => {
    const seatOptions = [
        { id: 1, name: "Economy Class", description: "In flight entertainment, reclining seats and food trays all provided" },
        { id: 2, name: "Business Class", description: "Leather seats with a massage option, private quarters, complimentary blankets and self care products always available." },
    ];

    const mealOptions = [
        { id: 1, name: "Regular", description: "Wagyu Steak with Black Truffle Sauce and Sticky Toffee Pudding" },
        { id: 2, name: "Vegetarian", description: "Lettuce and Tofu Kombucha Soup and Peanuts" },
        { id: 3, name: "Halal", description: "Grilled Lamb Chops and Ahududu Trilece" },
        { id: 4, name: "Kosher", description: "Potato Latkes and Chocolate Challah" },
    ];

    const liveSupport = [
        { id: 1, name: "24/7 Customer Support", description: "Our multilingual team is always here to support you." },
    ];

    const loungeServices = [
        { id: 1, name: "Priority Lounge Access", description: "Enjoy our exclusive lounges with access to a world class buffet, Playstation centre, gym, sleeping pods and shower cabins." },
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
                            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}>
                                Airline Services
                            </Typography>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Seat Selection
                                </Typography>
                                <Grid container spacing={2}>
                                    {seatOptions.map((seat) => (
                                        <Grid item xs={12} key={seat.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {seat.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {seat.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Meal Customisation
                                </Typography>
                                <Grid container spacing={2}>
                                    {mealOptions.map((meal) => (
                                        <Grid item xs={12} key={meal.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {meal.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {meal.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Live Customer Support
                                </Typography>
                                <Grid container spacing={2}>
                                    {liveSupport.map((support) => (
                                        <Grid item xs={12} key={support.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {support.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {support.description}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            <Box sx={{ mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                    Lounge Services
                                </Typography>
                                <Grid container spacing={2}>
                                    {loungeServices.map((lounge) => (
                                        <Grid item xs={12} key={lounge.id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                                        {lounge.name}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {lounge.description}
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

export default ServicesPage;