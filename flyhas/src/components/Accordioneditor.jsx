import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const Accordioneditor = ({ onSearch, initialParams }) => {
    const [cityList, setCityList] = useState([]);
    const [formValues, setFormValues] = useState(
        initialParams || {
            from: "",
            to: "",
            date: "",
            passengers: 1
        }
    );

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        axios.get('http://localhost:8080/api/cities')
            .then((res) => {
                setCityList(res.data);


                if (!initialParams && res.data.length >= 2) {
                    setFormValues({
                        from: res.data[0].name,
                        to: res.data[1].name,
                        date: "2025-04-25",
                        passengers: 1
                    });
                }
            })
            .catch((err) => console.error("Error fetching cities", err));
    }, [initialParams]);

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSearch = () => {
        onSearch(formValues);
    };

    return (
        <Accordion sx={{ backgroundColor: "#fff" }}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                <Typography component="span">Edit Flight Informations</Typography>
            </AccordionSummary>

            <AccordionDetails>
                <Box display="flex" flexWrap="wrap" gap={2}>
                    <TextField
                        select
                        label="From"
                        name="from"
                        value={formValues.from}
                        onChange={handleChange}
                        sx={{ width: '48%' }}
                    >
                        {cityList.map((city) => (
                            <MenuItem key={city.id} value={city.name}>
                                {city.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="To"
                        name="to"
                        value={formValues.to}
                        onChange={handleChange}
                        sx={{ width: '48%' }}
                    >
                        {cityList
                            .filter((city) => city.name !== formValues.from)
                            .map((city) => (
                                <MenuItem key={city.id} value={city.name}>
                                    {city.name}
                                </MenuItem>
                            ))}
                    </TextField>

                    <TextField
                        type="date"
                        label="Date"
                        name="date"
                        value={formValues.date}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: today }}
                        sx={{ width: '48%' }}
                    />

                    <TextField
                        type="number"
                        label="People"
                        name="passengers"
                        value={formValues.passengers}
                        onChange={handleChange}
                        inputProps={{ min: 1, max: 6 }}
                        sx={{ width: '48%' }}
                    />
                </Box>
            </AccordionDetails>

            <AccordionActions>
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
            </AccordionActions>
        </Accordion>
    );
};

export default Accordioneditor;