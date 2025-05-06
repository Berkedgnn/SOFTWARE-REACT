
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ManagerService from "../services/ManagerService";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

const AdminManagersTable = ({ refreshTrigger }) => {
    const [managers, setManagers] = useState([]);

    const fetchManagers = async () => {
        try {
            const response = await ManagerService.getAllManagers();
            const formatted = response.data.map(m => ({
                id: m.id,
                firstName: m.firstName,
                lastName: m.lastName,
                email: m.email,
                birthDate: m.birthDate,
                employeeNumber: m.employeeNumber,
            }));
            setManagers(formatted);
        } catch (err) {
            console.error("Failed to fetch managers:", err);
        }
    };

    useEffect(() => {
        fetchManagers();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        try {
            await ManagerService.deleteManager(id);
            fetchManagers();
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3, minWidth: 70 },
        { field: "firstName", headerName: "First Name", flex: 1, minWidth: 120 },
        { field: "lastName", headerName: "Last Name", flex: 1, minWidth: 120 },
        { field: "email", headerName: "Email", flex: 2, minWidth: 180 },
        { field: "birthDate", headerName: "Birth Date", flex: 1, minWidth: 110 },
        { field: "employeeNumber", headerName: "Employee No", flex: 1, minWidth: 130 },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            minWidth: 100,
            renderCell: (params) => (
                <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Grid
            container
            direction="column"
            sx={{

                p: { xs: 0, sm: 2 }
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    overflowX: "auto",
                    boxSizing: "border-box"
                }}
            >
                <Box
                    sx={{

                        minWidth: 200,
                    }}
                >
                    <Paper elevation={3}>
                        <DataGrid
                            autoHeight
                            rows={managers}
                            columns={columns}
                            pageSizeOptions={[5, 10]}
                            initialState={{
                                pagination: { paginationModel: { page: 0, pageSize: 5 } },
                            }}
                            sx={{
                                border: 0,

                                "& .MuiDataGrid-cell": {
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                },
                                "& .MuiDataGrid-columnHeader": {
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                },
                            }}
                        />
                    </Paper>
                </Box>
            </Box>
        </Grid>
    );
};

export default AdminManagersTable;