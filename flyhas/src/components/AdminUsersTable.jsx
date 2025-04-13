import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AdminService from "../services/AdminService";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminEmployeesTable = () => {
    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await AdminService.getAllCustomers();

            const transformed = response.data.map((customer) => ({
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
                birthDate: customer.birthDate,
                nationalId: customer.nationalId,
            }));
            setCustomers(transformed);
        } catch (error) {
            console.error("Müşteriler alınamadı:", error);
        }
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to proceed?")) return;

        try {
            await AdminService.deleteCustomer(id);
            setCustomers((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Silme hatası:", error);
        }
    };

    const columns = [
        { field: "firstName", headerName: "First Name", width: 150 },
        { field: "lastName", headerName: "Last Name", width: 150 },
        { field: "email", headerName: "Email", width: 200 },
        { field: "birthDate", headerName: "Birth Date", width: 130 },
        { field: "nationalId", headerName: "National ID", width: 160 },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Grid container sx={{ justifyContent: "center", padding: 2 }}>
            <Paper elevation={3} sx={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    pagination
                    disableRowSelectionOnClick
                />
            </Paper>
        </Grid>
    );
};

export default AdminEmployeesTable;

