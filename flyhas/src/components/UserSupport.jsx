import React, { useEffect, useState } from "react";
import supportService from "../services/supportService";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    Divider,
    Alert,
    IconButton,
    Dialog,
    Collapse,
    Grow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserSupport = () => {
    const [requests, setRequests] = useState([]);
    const [form, setForm] = useState({ errorCode: "", message: "", image: null });
    const [validation, setValidation] = useState({ errorCode: "", message: "" });
    const [editing, setEditing] = useState({});
    const [editValues, setEditValues] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [previewSrc, setPreviewSrc] = useState(null);

    const fetchRequests = () =>
        supportService.getMySupportRequests()
            .then(res => {
                setRequests(res.data);
                setError("");
            })
            .catch(() => setError("Failed to load requests."));

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleChange = e => {
        const { name, value, files } = e.target;
        setForm(prev => ({ ...prev, [name]: name === "image" ? files[0] : value }));
        setValidation(prev => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const errors = {};
        if (!form.errorCode.trim()) errors.errorCode = "Error code cannot be empty";
        if (!form.message.trim()) errors.message = "Message cannot be empty";
        setValidation(errors);
        if (errors.errorCode || errors.message) return;

        setError("");
        const fd = new FormData();
        fd.append("errorCode", form.errorCode);
        fd.append("message", form.message);
        if (form.image) fd.append("image", form.image);

        supportService.createSupportRequest(fd)
            .then(() => {
                setSuccess("Request created successfully.");
                setTimeout(() => setSuccess(""), 5000);
                setForm({ errorCode: "", message: "", image: null });
                setShowForm(false);
                fetchRequests();
            })
            .catch(() => setError("Failed to submit request."));
    };

    const startEdit = req => {
        setEditing(prev => ({ ...prev, [req.id]: true }));
        setEditValues(prev => ({
            ...prev,
            [req.id]: { errorCode: req.errorCode, message: req.message, image: null }
        }));
    };

    const handleEditChange = (id, e) => {
        const { name, value, files } = e.target;
        setEditValues(prev => ({
            ...prev,
            [id]: { ...prev[id], [name]: name === "image" ? files[0] : value }
        }));
    };

    const submitEdit = id => {
        const vals = editValues[id];

        const errors = {};
        if (!vals.errorCode.trim()) errors.errorCode = "Error code cannot be empty";
        if (!vals.message.trim()) errors.message = "Message cannot be empty";
        setValidation(prev => ({ ...prev, ...errors }));
        if (errors.errorCode || errors.message) return;

        const fd = new FormData();
        fd.append("errorCode", vals.errorCode);
        fd.append("message", vals.message);
        if (vals.image) fd.append("image", vals.image);

        supportService.updateSupportRequest(id, fd)
            .then(() => {
                setSuccess("Request updated successfully.");
                setTimeout(() => setSuccess(""), 5000);
                setEditing(prev => ({ ...prev, [id]: false }));
                fetchRequests();
            })
            .catch(() => setError("Failed to update request."));
    };

    const cancelEdit = id => {
        setEditing(prev => ({ ...prev, [id]: false }));
        setValidation({ errorCode: "", message: "" });
    };

    const handleDelete = id =>
        supportService.deleteSupportRequest(id)
            .then(fetchRequests)
            .catch(() => setError("Failed to delete request."));

    return (
        <Box sx={{ p: 3 }}>




            <Typography variant="h6" gutterBottom>My Requests</Typography>
            <Divider sx={{ mb: 3 }} />
            {requests.length === 0
                ? <Typography>No requests found.</Typography>
                : requests.map((req, idx) => (
                    <Grow in key={req.id} timeout={300 + idx * 100}>
                        <Paper elevation={4} sx={{ p: 2, mb: 2, boxShadow: 4 }}>
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
                                    {!editing[req.id] ? (
                                        <>
                                            <Typography
                                                align="left"
                                                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                                            >
                                                <strong>Error Code:</strong> {req.errorCode}
                                            </Typography>
                                            <Typography
                                                align="left"
                                                sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                                            >
                                                <strong>Message:</strong> {req.message}
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <TextField
                                                label="Error Code"
                                                name="errorCode"
                                                value={editValues[req.id].errorCode}
                                                onChange={e => handleEditChange(req.id, e)}
                                                error={!!validation.errorCode}
                                                helperText={validation.errorCode}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <TextField
                                                label="Message"
                                                name="message"
                                                value={editValues[req.id].message}
                                                onChange={e => handleEditChange(req.id, e)}
                                                error={!!validation.message}
                                                helperText={validation.message}
                                                multiline
                                                rows={4}
                                                fullWidth
                                                margin="normal"
                                            />
                                            <input type="file" name="image" onChange={e => handleEditChange(req.id, e)} />
                                        </>
                                    )}

                                    {req.managerResponse && !editing[req.id] && (
                                        <Typography align="left" sx={{ mt: 1 }}>
                                            <strong>Response:</strong> {req.managerResponse}
                                        </Typography>
                                    )}

                                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, gap: 1 }}>
                                        {editing[req.id] ? (
                                            <>
                                                <Button variant="contained" color="success" onClick={() => submitEdit(req.id)}>
                                                    Save
                                                </Button>
                                                <Button variant="outlined" onClick={() => cancelEdit(req.id)}>
                                                    Cancel
                                                </Button>
                                            </>
                                        ) : (
                                            <Button variant="contained" color="warning" onClick={() => startEdit(req)}>
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
                        </Paper>
                    </Grow>
                ))
            }

            <Dialog open={!!previewSrc} onClose={() => setPreviewSrc(null)}>
                <Box
                    component="img"
                    src={previewSrc}
                    alt="preview"
                    sx={{ maxWidth: "90vw", maxHeight: "90vh" }}
                />
            </Dialog>


            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Divider sx={{ mb: 3 }} />

            <Collapse in={showForm}>
                <Paper elevation={2} sx={{ p: 2, mb: 4 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Error Code"
                            name="errorCode"
                            value={form.errorCode}
                            onChange={handleChange}
                            error={!!validation.errorCode}
                            helperText={validation.errorCode}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            error={!!validation.message}
                            helperText={validation.message}
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                        />
                        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
                            <input type="file" name="image" onChange={handleChange} />
                            <Box>
                                <Button variant="contained" color="success" type="submit" sx={{ mr: 1 }}>
                                    Submit
                                </Button>
                                <Button variant="outlined" onClick={() => setShowForm(false)}>
                                    Cancel
                                </Button>
                            </Box>
                        </Grid>
                    </form>
                </Paper>
            </Collapse>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button variant="contained" onClick={() => setShowForm(f => !f)}>
                    {showForm ? "Hide Form" : "Create Request"}
                </Button>
            </Box>
        </Box>
    );
};

export default UserSupport;