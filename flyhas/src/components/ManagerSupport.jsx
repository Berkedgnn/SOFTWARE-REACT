import React, { useEffect, useState } from "react";
import supportService from "../services/supportService";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    Alert,
    IconButton,
    Dialog
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ManagerSupport = () => {
    const [requests, setRequests] = useState([]);
    const [responses, setResponses] = useState({});
    const [editing, setEditing] = useState({});
    const [error, setError] = useState("");
    const [successIds, setSuccessIds] = useState({});
    const [previewSrc, setPreviewSrc] = useState(null);

    const fetchRequests = () => {
        return supportService.getAllSupportRequests()
            .then(res => {
                setRequests(res.data);
                const editState = {};
                res.data.forEach(r => {
                    editState[r.id] = !r.managerResponse;
                });
                setEditing(editState);
                setError("");
            })
            .catch(() => setError("Failed to load requests."));
    };


    useEffect(() => {
        fetchRequests();
    }, []);

    const handleResponseChange = (id, value) => {
        setResponses(prev => ({ ...prev, [id]: value }));
    };

    const submitResponse = (id) => {
        const resp = responses[id];
        if (!resp) return;
        supportService.respondToSupportRequest(id, resp)
            .then(() => {
                setSuccessIds(prev => ({ ...prev, [id]: true }));
                setTimeout(() => {
                    setSuccessIds(prev => {
                        const nxt = { ...prev };
                        delete nxt[id];
                        return nxt;
                    });
                }, 5000);
                fetchRequests();
            })
            .catch(() => setError("Failed to send response."));
    };

    const handleDelete = (id) => {
        supportService.deleteSupportRequest(id)
            .then(fetchRequests)
            .catch(() => setError("Failed to delete request."));
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                All Support Requests
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {requests.length === 0 ? (
                <Typography>No support requests found.</Typography>
            ) : (
                requests.map(req => (
                    <Paper key={req.id} elevation={4} sx={{ p: 2, mb: 3, boxShadow: 4 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                            {req.screenshot && (
                                <Box
                                    component="img"
                                    src={`http://localhost:8080${req.screenshot}`}
                                    alt="screenshot"
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        objectFit: "cover",
                                        cursor: "pointer",
                                        mr: 2,
                                        boxShadow: 1
                                    }}
                                    onClick={() => setPreviewSrc(`http://localhost:8080${req.screenshot}`)}
                                />
                            )}
                            <Box sx={{ flex: 1 }}>
                                {successIds[req.id] && (
                                    <Alert severity="success" sx={{ mt: 1, mb: 1 }}>
                                        Request has been responded.
                                    </Alert>
                                )}
                                <Typography align="left">
                                    <strong>Customer:</strong> {req.customerEmail}
                                </Typography>
                                <Typography align="left">
                                    <strong>Error Code:</strong> {req.errorCode}
                                </Typography>
                                <Typography align="left">
                                    <strong>Message:</strong> {req.message}
                                </Typography>



                                {req.managerResponse && !editing[req.id] && (
                                    <Typography align="left" sx={{ mb: 1 }}>
                                        <strong>Existing Response:</strong> {req.managerResponse}
                                    </Typography>
                                )}

                                <Divider sx={{ my: 2 }} />

                                {editing[req.id] && (
                                    <TextField
                                        fullWidth
                                        label="Your Response"
                                        multiline
                                        rows={3}
                                        margin="normal"
                                        value={responses[req.id] || ""}
                                        onChange={e => handleResponseChange(req.id, e.target.value)}
                                    />
                                )}

                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    {editing[req.id] ? (
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => submitResponse(req.id)}
                                        >
                                            Answer
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => setEditing(prev => ({ ...prev, [req.id]: true }))}
                                        >
                                            Update
                                        </Button>
                                    )}
                                    <IconButton
                                        onClick={() => handleDelete(req.id)}
                                        sx={{
                                            bgcolor: "error.main",
                                            color: "common.white",
                                            width: 40,
                                            height: 40,
                                            "&:hover": { bgcolor: "error.dark" }
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>

                        <Dialog open={!!previewSrc} onClose={() => setPreviewSrc(null)}>
                            <Box
                                component="img"
                                src={previewSrc}
                                alt="preview"
                                sx={{ maxWidth: "90vw", maxHeight: "90vh" }}
                            />
                        </Dialog>
                    </Paper>
                ))
            )}
        </Box>
    );
};

export default ManagerSupport;