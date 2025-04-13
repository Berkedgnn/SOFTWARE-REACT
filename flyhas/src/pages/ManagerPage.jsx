import React from 'react'
import { styled } from '@mui/material/styles';
import { Outlet } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import SideMenuManagerProfile from '../components/SideMenuManagerProfile';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const ManagerPage = () => {
    return (

        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} direction="row"
            sx={{
                justifyContent: "space-evenly",
                alignItems: "flex-start",
            }}>
            <Grid size={{ xs: 4, sm: 9, md: 3 }}>
                <Item><SideMenuManagerProfile /></Item>
            </Grid>
            <Grid container size={{ xs: 4, sm: 9, md: 9 }} direction="column"
                sx={{
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                }}>
                <Grid container spacing={2} size={{ xs: 4, sm: 8, md: 12, lg: 12 }} direction="column" sx={{
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                }} >
                    <Item><Outlet /></Item>
                </Grid>
                <Grid size={{ xs: 4, sm: 8, md: 12, lg: 12 }}></Grid>

            </Grid>


        </Grid>


    )
}

export default ManagerPage