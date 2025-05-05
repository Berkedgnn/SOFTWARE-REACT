import React, { useEffect, useState } from "react";
import supportService from "../services/supportService";
import {
    Box, Typography, TextField, Button, Paper
} from "@mui/material";

const ManagerSupport = () => {
    const [requests, setRequests] = useState([]);
    const [responses, setResponses] = useState({});

    const fetchRequests = () => {
        supportService.getAllSupportRequests().then((res) => {
            setRequests(res.data);
        });
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleResponseChange = (id, value) => {
        setResponses((prev) => ({ ...prev, [id]: value }));
    };

    const submitResponse = (id) => {
        const response = responses[id];
        if (!response) return;

        supportService.respondToSupportRequest(id, response).then(fetchRequests);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>All Support Requests</Typography>
            {requests.length === 0 ? (
                <Typography>No support requests found.</Typography>
            ) : (
                requests.map((req) => (
                    <Paper key={req.id} sx={{ p: 2, mb: 3 }}>
                        <Typography><strong>From:</strong> {req.customer?.email || "Unknown"}</Typography>
                        <Typography><strong>Error:</strong> {req.errorCode}</Typography>
                        <Typography><strong>Message:</strong> {req.message}</Typography>
                        {req.screenshot && (
                            <img src={`http://localhost:8080${req.screenshot}`} alt="Screenshot" width="200" />
                        )}
                        <TextField
                            fullWidth
                            label="Response"
                            multiline
                            rows={2}
                            margin="normal"
                            value={responses[req.id] || ""}
                            onChange={(e) => handleResponseChange(req.id, e.target.value)}
                        />
                        <Button variant="contained" onClick={() => submitResponse(req.id)}>Submit Response</Button>
                    </Paper>
                ))
            )}
        </Box>
    );
};

export default ManagerSupport;