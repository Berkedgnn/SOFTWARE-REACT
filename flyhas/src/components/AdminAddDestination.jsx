// src/components/AdminAddDestination.jsx
import React, { useState, useEffect } from 'react';
import {
    Grid, Paper, Box, Fab,
    TextField, CardMedia, Typography, Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import RemoveIcon from '@mui/icons-material/Remove';
import cityService from '../services/CityService';
import Antalya from '../assets/Antalya.jpg';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const AdminAddDestination = () => {
    const [cities, setCities] = useState([]);
    const [newCity, setNewCity] = useState({ name: '', country: '', image: null });
    const [showInput, setShowInput] = useState(false);

    const fetchCities = async () => {
        const res = await cityService.getAllCities();
        setCities(res.data);
    };

    useEffect(() => {
        fetchCities();
    }, []);

    const handleAddClick = () => setShowInput(true);

    const handleSaveClick = async () => {
        if (!newCity.name.trim() || !newCity.country.trim()) {
            alert("City name and country cannot be empty.");
            return;
        }
        const fd = new FormData();
        fd.append("name", newCity.name);
        fd.append("country", newCity.country);
        if (newCity.image) fd.append("image", newCity.image);

        try {
            await cityService.addCity(fd);
            setNewCity({ name: '', country: '', image: null });
            setShowInput(false);
            fetchCities();
        } catch {
            alert("City could not be added.");
        }
    };

    const handleRemoveClick = async id => {
        await cityService.deleteCity(id);
        fetchCities();
    };

    return (
        <Grid container spacing={2} direction="column" sx={{ p: 2 }}>
            <Grid container spacing={2} justifyContent="center">
                {cities.map(city => (
                    <Grid item xs={12} md={4} key={city.id}>
                        <Item>
                            <CardMedia
                                component="img"
                                alt={city.name}
                                image={city.imagePath
                                    ? `http://localhost:8080${city.imagePath}`
                                    : Antalya}
                                sx={{ width: '100%', height: 150, objectFit: 'cover', mb: 1 }}
                            />
                            <Typography variant="h6">{city.name}</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="body2">{city.country}</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                <Fab
                                    size="small"
                                    aria-label="remove"
                                    sx={{ backgroundColor: '#d84315' }}
                                    onClick={() => handleRemoveClick(city.id)}
                                >
                                    <RemoveIcon sx={{ color: 'white' }} />
                                </Fab>
                            </Box>
                        </Item>
                    </Grid>
                ))}
            </Grid>

            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                {!showInput ? (
                    <Fab
                        aria-label="add"
                        sx={{ backgroundColor: '#2e7d32' }}
                        onClick={handleAddClick}
                    >
                        <AddIcon sx={{ color: 'white' }} />
                    </Fab>
                ) : (
                    <Fab variant="extended" onClick={handleSaveClick}>
                        <CheckIcon sx={{ mr: 1 }} /> Save
                    </Fab>
                )}
            </Grid>

            {showInput && (
                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label="City Name"
                            value={newCity.name}
                            onChange={e => setNewCity({ ...newCity, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <TextField
                            fullWidth
                            label="Country"
                            value={newCity.country}
                            onChange={e => setNewCity({ ...newCity, country: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={e => setNewCity({ ...newCity, image: e.target.files[0] })}
                        />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default AdminAddDestination;