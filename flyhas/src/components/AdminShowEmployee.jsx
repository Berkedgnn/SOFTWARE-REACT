import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import AdminEmployeesTable from './AdminEmployeesTable';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';

const initialFormData = {
    employeeNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: ''
};
const initialFormErrors = {
    employeeNumber: '',
    email: '',
    birthDate: ''
};
const initialPasswordValidation = {
    hasLowerUpper: false,
    hasNumber: false,
    hasSpecialChar: false,
    noConsecutive: true,
    noTurkishChar: true,
    lengthValid: false,
};

const AdminShowEmployee = () => {
    const [open, setOpen] = useState(false);
    const [refreshTable, setRefreshTable] = useState(false);
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });
    const [passwordValidation, setPasswordValidation] = useState(initialPasswordValidation);


    const todayStr = new Date().toISOString().split('T')[0];

    const handleOpen = () => {
        setFormData(initialFormData);
        setFormErrors(initialFormErrors);
        setPasswordValidation(initialPasswordValidation);
        setAlert({ open: false, severity: 'success', message: '' });
        setOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: '' }));

        if (name === 'email') {
            const valid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            setFormErrors(prev => ({ ...prev, email: valid ? '' : 'Please enter a valid email.' }));
        }

        if (name === 'birthDate') {
            const bd = new Date(value);
            setFormErrors(prev => ({
                ...prev,
                birthDate: bd > new Date() ? 'Birth date cannot be in the future.' : ''
            }));
        }

        if (name === 'password') {
            setPasswordValidation({
                hasLowerUpper: /(?=.*[a-z])(?=.*[A-Z])/.test(value),
                hasNumber: /(?=.*\d)/.test(value),
                hasSpecialChar: /(?=.*[.!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(value),
                noConsecutive: !/(.)\1\1/.test(value),
                noTurkishChar: !/[çğıöşüÇĞİÖŞÜ]/.test(value),
                lengthValid: value.length >= 8 && value.length <= 16,
            });
        }
    };

    const isPasswordValid = () => {
        const v = passwordValidation;
        return v.hasLowerUpper && v.hasNumber && v.hasSpecialChar &&
            v.noConsecutive && v.noTurkishChar && v.lengthValid;
    };

    const handleSubmit = async () => {
        setAlert({ open: false, severity: 'success', message: '' });
        setFormErrors(initialFormErrors);


        if (!formData.employeeNumber) {
            setFormErrors(prev => ({ ...prev, employeeNumber: 'Employee number is required.' }));
            return;
        }
        if (!formData.birthDate) {
            setFormErrors(prev => ({ ...prev, birthDate: 'Birth date is required.' }));
            return;
        }
        if (formErrors.email || formErrors.birthDate) {
            return;
        }
        if (!isPasswordValid()) {
            setAlert({ open: true, severity: 'error', message: 'Please satisfy all password rules.' });
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/api/auth/register/manager',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );
            setAlert({ open: true, severity: 'success', message: 'Manager successfully added!' });
            setOpen(false);
            setRefreshTable(prev => !prev);

        } catch (err) {
            const status = err.response?.status;
            const msg = err.response?.data?.message?.toLowerCase() || '';

            if (status === 403) {
                if (msg.includes('employee')) {
                    setFormErrors(prev => ({ ...prev, employeeNumber: 'Employee number already existed.' }));
                } else if (msg.includes('email')) {
                    setFormErrors(prev => ({ ...prev, email: 'Email already existed.' }));
                } else {
                    setAlert({ open: true, severity: 'error', message: 'Email or Employee number is already existed.' });
                }
            } else {
                setAlert({ open: true, severity: 'error', message: 'Registration failed.' });
            }
        }
    };

    return (
        <Grid
            container
            spacing={2}
            direction="column"
            sx={{ justifyContent: 'flex-start', alignItems: 'stretch', p: 2 }}
        >
            <Button variant="contained" onClick={handleOpen}>
                Add Manager
            </Button>

            <AdminEmployeesTable refreshTrigger={refreshTable} />

            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Register New Manager</DialogTitle>
                <DialogContent>
                    {alert.open && (
                        <Alert severity={alert.severity} sx={{ width: '100%', mb: 1 }}>
                            {alert.message}
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Employee Number"
                        name="employeeNumber"
                        value={formData.employeeNumber}
                        onChange={handleChange}
                        error={!!formErrors.employeeNumber}
                        helperText={formErrors.employeeNumber}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />

                    <TextField
                        fullWidth
                        margin="dense"
                        type="password"
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />


                    <TextField
                        fullWidth
                        margin="dense"
                        label="Birth Date"
                        name="birthDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ max: todayStr }}
                        value={formData.birthDate}
                        onChange={handleChange}
                        error={!!formErrors.birthDate}
                        helperText={formErrors.birthDate}
                    />
                    <Paper elevation={1} sx={{ p: 2, mt: 1, bgcolor: '#f5f5f5', textAlign: 'left' }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Password Rules
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {[
                                { text: 'Lower & upper case letters', ok: passwordValidation.hasLowerUpper },
                                { text: 'At least one number', ok: passwordValidation.hasNumber },
                                { text: 'At least one special character', ok: passwordValidation.hasSpecialChar },
                                { text: 'No three identical in a row', ok: passwordValidation.noConsecutive },
                                { text: 'No Turkish characters', ok: passwordValidation.noTurkishChar },
                                { text: '8–16 characters long', ok: passwordValidation.lengthValid },
                            ].map(({ text, ok }) => (
                                <li key={text} style={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    {ok
                                        ? <CheckCircle fontSize="small" sx={{ mr: 1, color: 'green' }} />
                                        : <Cancel fontSize="small" sx={{ mr: 1, color: 'red' }} />
                                    }
                                    <Typography variant="body2">{text}</Typography>
                                </li>
                            ))}
                        </ul>
                    </Paper>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default AdminShowEmployee