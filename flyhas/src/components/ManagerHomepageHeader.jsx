import React, { useEffect, useState } from "react";
import bannerService from "../services/bannerService";
import {
    Box, Typography, IconButton, Grid, Paper, Checkbox, Divider,
    FormControlLabel, Tooltip, Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ManagerHomepageHeader = () => {
    const [banners, setBanners] = useState([]);
    const [file, setFile] = useState(null);

    const fetchBanners = () =>
        bannerService.getAll().then(res => {
            const normalized = res.data.map(b => ({
                ...b,
                home: !!b.home
            }));
            setBanners(normalized);
        });

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleUpload = () => {
        if (!file) return;
        const fd = new FormData();
        fd.append("image", file);
        bannerService
            .upload(fd)
            .then(fetchBanners)
            .catch(err => console.error("Upload failed:", err));
        setFile(null);
    };

    const handleDelete = id => {
        bannerService
            .deleteById(id)
            .then(fetchBanners)
            .catch(err => console.error("Delete failed:", err));
    };

    const handleToggleHome = id => {
        bannerService
            .toggleHome(id)
            .then(fetchBanners)
            .catch(err => console.error("Toggle failed:", err));
    };

    return (
        <Box sx={{ p: 4, bgcolor: "#f7f9fc", borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>
                Homepage Banners
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                {banners.map(b => (
                    <Grid item key={b.id} xs={12} sm={6} md={4} lg={3}>
                        <Paper
                            elevation={4}
                            sx={{
                                position: "relative",
                                borderRadius: 3,
                                overflow: "hidden",
                                height: 220,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                component="img"
                                src={`http://localhost:8080/api/banners/image/${b.filename}`}
                                alt={`Banner ${b.id}`}
                                sx={{ width: "100%", height: "140px", objectFit: "cover" }}
                            />

                            <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={b.home}
                                            onChange={() => handleToggleHome(b.id)}
                                            sx={{ color: "#003366" }}
                                        />
                                    }
                                    label="Show on Home"
                                />
                                <Tooltip title="Delete">
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDelete(b.id)}
                                        sx={{
                                            bgcolor: "#ffebee",
                                            "&:hover": { bgcolor: "#ffcdd2" }
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" sx={{ color: "#c62828" }} />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={2} sx={{ mt: 4 }} justifyContent="flex-end" alignItems="center">
                <Grid item>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<span role="img" aria-label="folder">📁</span>}
                        sx={{
                            backgroundColor: "#ff9800",
                            color: "white",
                            borderRadius: 1,
                            "&:hover": { backgroundColor: "#fb8c00" }
                        }}
                    >
                        Choose Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </Button>
                </Grid>
                <Grid item>
                    <Tooltip title="Upload">
                        <span>
                            <IconButton
                                onClick={handleUpload}
                                disabled={!file}
                                sx={{
                                    backgroundColor: "#4caf50",
                                    color: "white",
                                    width: 48,
                                    height: 48,
                                    borderRadius: 2,
                                    "&:hover": { backgroundColor: "#388e3c" }
                                }}
                            >
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
                {file && (
                    <Grid item>
                        <Typography variant="body2" sx={{ fontStyle: "italic", mt: 1 }}>
                            {file.name}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default ManagerHomepageHeader;