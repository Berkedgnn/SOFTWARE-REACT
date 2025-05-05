import React from 'react';
import FlightItem from './FlightItem';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const FlightList = ({ flights }) => {
    console.log("Flight listesi:", flights);

    return (
        <Grid container spacing={2} sx={{ backgroundColor: "rgba(255, 255, 255, 0)", mt: 2 }}>
            {flights.length === 0 ? (
                <Box sx={{ width: '100%' }}>
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{ color: "#555", border: "1px dashed #ccc", padding: 3, borderRadius: 2 }}
                    >
                        0 matched Flight is found.
                    </Typography>
                </Box>
            ) : (
                flights.map((flight) => (
                    <Grid item xs={12} md={5} lg={12} key={flight.id}>
                        <FlightItem flight={flight} />
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default FlightList;