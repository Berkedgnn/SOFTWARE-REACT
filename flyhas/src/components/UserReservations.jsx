import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CardMedia from '@mui/material/CardMedia';
import Flight3 from '../assets/Flight3.png';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import UndoIcon from '@mui/icons-material/Undo';
import ReservationService from '../services/ReservationService';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const UserReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [cancelStatus, setCancelStatus] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        ReservationService.getMyReservations(email)
            .then(response => setReservations(response.data))
            .catch(error => console.error("Error loading reservations:", error));
    }, []);

    const toggleCancel = (id) => {
        setCancelStatus(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <Grid container spacing={2} direction="column">
            {reservations.map((reservation) => (
                <Grid item key={reservation.id}>
                    <Item sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 2 }}>
                        <CardMedia component="img" image={Flight3} sx={{ width: 140, height: 60, objectFit: "fill", borderRadius: "8px" }} />
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="subtitle2">Reservation Code:</Typography>
                            <Typography variant="h6" fontWeight="bold">{reservation.reservationCode}</Typography>
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                            <Typography variant="subtitle2">Seat:</Typography>
                            <Typography fontWeight="bold">{reservation.seat?.seatNumber}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {cancelStatus[reservation.id] && <Typography sx={{ fontSize: '10px' }}>Pending Cancellation</Typography>}
                            <Fab size="small" sx={{ backgroundColor: "#d84315" }} onClick={() => toggleCancel(reservation.id)}>
                                {cancelStatus[reservation.id] ? <UndoIcon /> : <RemoveIcon />}
                            </Fab>
                        </Box>
                    </Item>
                </Grid>
            ))}
            <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Fab aria-label="add" sx={{ backgroundColor: '#2e7d32' }} onClick={() => navigate("/FlightList")}>
                    <AddIcon />
                </Fab>
            </Grid>
        </Grid>
    );
};

export default UserReservations;