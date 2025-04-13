import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ContactsIcon from '@mui/icons-material/Contacts';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import CheckIcon from '@mui/icons-material/Check';
import profile1 from '../assets/profile1.png';
import profile2 from '../assets/profile2.png';



const ManagerSupport = () => {
    return (
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} direction="column"
            sx={{
                justifyContent: "flex-start",
                alignItems: "stretch",
            }}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} direction="row"
                sx={{
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}>
                <Grid size={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            alt="SupportProfile"

                            image={profile2}
                            sx={{
                                width: { xs: "30%", sm: "30%", md: "28%", lg: "24%" },
                                height: "auto",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left" }}>
                                    Unable to make reservation
                                </Typography>
                                <Typography gutterBottom variant="h9" component="div" sx={{ textAlign: "left" }}>
                                    Taner Arslan / Role: ( Signed User)
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "left" }}>
                                    I was trying to make reservation for Ankara Istanbul flight but web site give me error with 345 code. Could you help me?
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                    <Fab aria-label="add" sx={{ backgroundColor: '#ff3d00' }}>
                                        <AutoDeleteIcon />
                                    </Fab>
                                    <Fab color="secondary" aria-label="edit">
                                        <CheckIcon />
                                    </Fab>
                                    <Fab variant="extended">
                                        <ContactsIcon sx={{ mr: 1 }} />
                                        Contact user
                                    </Fab>
                                    <Fab disabled aria-label="like">
                                        <FavoriteIcon />
                                    </Fab>
                                </Box>
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>
                <Grid size={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            alt="SupportProfile"

                            image={profile1}
                            sx={{
                                width: { xs: "30%", sm: "30%", md: "28%", lg: "24%" },
                                height: "auto",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                            }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left" }}>
                                    Unable make payment
                                </Typography>
                                <Typography gutterBottom variant="h9" component="div" sx={{ textAlign: "left" }}>
                                    Ilktan Ar / Role: ( Signed User)
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: "left" }}>
                                    Somehow my card was declined but it had enough money in it. I think the problem is not about my credit card. Could you help me IMMEDIATELY?
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                                    <Fab size="small" aria-label="add" sx={{ backgroundColor: '#ff3d00' }}>
                                        <AutoDeleteIcon />
                                    </Fab>
                                    <Fab size="small" color="secondary" aria-label="edit">
                                        <CheckIcon />
                                    </Fab>
                                    <Fab size="small" variant="extended">
                                        <ContactsIcon sx={{ mr: 1 }} />
                                        Contact user
                                    </Fab>
                                    <Fab size="small" disabled aria-label="like">
                                        <FavoriteIcon />
                                    </Fab>
                                </Box>
                            </CardActions>
                        </Box>
                    </Card>
                </Grid>


            </Grid>


        </Grid>
    )
}

export default ManagerSupport