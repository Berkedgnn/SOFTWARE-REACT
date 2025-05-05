import React, { useEffect, useState } from "react";
import supportService from "../services/supportService";
import {
    Box, Typography, Button, TextField, Paper, Grid, Divider
} from "@mui/material";

const UserSupport = () => {
    const [requests, setRequests] = useState([]);
    const [form, setForm] = useState({ errorCode: "", message: "", image: null });

    const fetchRequests = () => {
        supportService.getMySupportRequests().then((res) => {
            setRequests(res.data);
        });
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("errorCode", form.errorCode);
        formData.append("message", form.message);
        if (form.image) formData.append("image", form.image);

        supportService.createSupportRequest(formData).then(() => {
            fetchRequests();
            setForm({ errorCode: "", message: "", image: null });
        });
    };

    const handleDelete = (id) => {
        supportService.deleteSupportRequest(id).then(fetchRequests);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Create Support Request</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Error Code"
                    name="errorCode"
                    value={form.errorCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                />

                <Grid container alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
                    <Grid item>
                        <input type="file" name="image" onChange={handleChange} />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" type="submit">Submit</Button>
                    </Grid>
                </Grid>
            </form>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6">My Requests</Typography>
            {requests.length === 0 ? (
                <Typography>No requests found.</Typography>
            ) : (
                requests.map((req) => (
                    <Paper key={req.id} sx={{ p: 2, mb: 2 }}>
                        <Typography><strong>Error:</strong> {req.errorCode}</Typography>
                        <Typography><strong>Message:</strong> {req.message}</Typography>
                        {req.screenshot && (
                            <img src={`http://localhost:8080${req.screenshot}`} alt="Screenshot" width="200" />
                        )}
                        {req.managerResponse && (
                            <Typography><strong>Response:</strong> {req.managerResponse}</Typography>
                        )}
                        <Button onClick={() => handleDelete(req.id)} color="error">Delete</Button>
                    </Paper>
                ))
            )}
        </Box>
    );
};

export default UserSupport;