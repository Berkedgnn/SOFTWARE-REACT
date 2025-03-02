import React from 'react'

import CssBaseline from '@mui/material/CssBaseline';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const Flightlistpage = () => {

    const searchData = {
        from: "Istanbul",
        to: "London",
        date: "2025-03-05",
        passengers: 2,
    };

    return (
        <>
            <Container maxWidth="md" sx={{ bgcolor: '#cfe8fc', p: 3, borderRadius: 2, mb: 4 }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={12}>
                        <Box bgcolor="white" p={2} borderRadius={2} boxShadow={2}>
                            <Typography>Fourth Box (Full Width)</Typography>
                        </Box>
                    </Grid>
                    <Divider sx={{ width: '100%' }} /> {/* Row divider */}
                    <Grid size={12}>
                        <Box bgcolor="white" p={2} borderRadius={2} boxShadow={2}>
                            <Typography>Fourth Box (Full Width)</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <Container maxWidth="md" sx={{ bgcolor: '#cfe8fc', p: 3, borderRadius: 2 }}>
                <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={12}>
                        <Box bgcolor="white" p={2} borderRadius={2} boxShadow={2}>
                            <Typography>Fourth Box (Full Width)</Typography>
                        </Box>
                    </Grid>
                    <Divider sx={{ width: '100%' }} /> {/* Row divider */}
                    <Grid size={12}>
                        <Box bgcolor="white" p={2} borderRadius={2} boxShadow={2}>
                            <Typography>Fourth Box (Full Width)</Typography>
                        </Box>
                    </Grid>
                    <Divider sx={{ width: '100%' }} /> {/* Row divider */}
                    <Grid size={12}>
                        <Box bgcolor="white" p={2} borderRadius={2} boxShadow={2}>
                            <Typography>Fourth Box (Full Width)</Typography>
                        </Box>
                    </Grid>
                    <Divider sx={{ width: '100%' }} /> {/* Row divider */}
                    <Grid size={12}>
                        <Box bgcolor="white" p={2} borderRadius={2} boxShadow={2}>
                            <Typography>Fourth Box (Full Width)</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Flightlistpage
