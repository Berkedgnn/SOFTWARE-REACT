import React from 'react'
import Grid from '@mui/material/Grid2';
import AdminUsersTable from './AdminUsersTable';

const ManagerShowCustomer = () => {
    return (
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} direction="row"
            sx={{
                justifyContent: "space-evenly",
                alignItems: "flex-start",
            }}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} direction="column"
                sx={{
                    justifyContent: "space-evenly",
                    alignItems: "stretch",
                }}>
                <AdminUsersTable />

            </Grid>

        </Grid>
    )
}

export default ManagerShowCustomer