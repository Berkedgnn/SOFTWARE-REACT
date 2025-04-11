import React, { useState, useEffect } from "react";
import {
    Grid, TextField, Button, ButtonGroup, Paper, Avatar, Box
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { Typography } from "@mui/material";

const getInitials = (firstName, lastName) => {
    const f = firstName?.charAt(0)?.toUpperCase() || "";
    const l = lastName?.charAt(0)?.toUpperCase() || "";
    return `${f}${l}`;
};

const ItemInside = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    border: "none",
}));

const AdminInfo = () => {
    const [extraFields, setExtraFields] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        birthDate: "",
        department: "",
        nationalId: "",
        employeeNumber: "",
    });

    const [errors, setErrors] = useState({});

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        axios.get("http://localhost:8080/api/profile/admin", {
            headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
            setFormData(res.data);
        }).catch((err) => {
            console.error("Failed to fetch profile", err);
        });
    }, []);

    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
            newErrors.email = "Please enter a valid email.";
        }

        // National ID validation
        if (formData.nationalId && !/^\d{11}$/.test(formData.nationalId)) {
            newErrors.nationalId = "National ID must be 11 digits.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleToggleEdit = () => {
        if (isEditable && validateForm()) {
            handleSave();
        }
        setIsEditable(!isEditable);
    };

    const [passwordValidation, setPasswordValidation] = useState({
        hasLowerUpper: false,
        hasNumber: false,
        hasSpecialChar: false,
        noConsecutive: true,
        noTurkishChar: true,
        lengthValid: false,
    });

    const handleSave = async () => {
        const token = localStorage.getItem("userToken");
        try {
            await axios.put("http://localhost:8080/api/profile/admin", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile updated successfully.");
        } catch (err) {
            alert("Failed to update profile.");
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePasswordUpdate = async () => {
        if (passwordData.newPassword.length < 8 || !/\d/.test(passwordData.newPassword)) {
            alert("New password must be at least 8 characters and include a number.");
            return;
        }

        const token = localStorage.getItem("userToken");
        try {
            await axios.put("http://localhost:8080/api/profile/admin/password", passwordData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Password updated successfully.");
            setPasswordData({ currentPassword: "", newPassword: "" });
            setExtraFields(false);
        } catch (err) {
            alert("Failed to update password.");
            console.error(err);
        }
    };

    return (
        <Grid container spacing={2} sx={{ justifyContent: "center", padding: 2 }}>
            <Grid item xs={12} md={3}>
                <ItemInside>
                    <Avatar
                        sx={{
                            width: 220,
                            height: 220,
                            bgcolor: "rgba(200, 200, 200, 0.3)",
                            color: "#000",
                            fontSize: "3rem",
                            fontWeight: 600,
                        }}
                    >
                        {getInitials(formData.firstName, formData.lastName)}
                    </Avatar>
                </ItemInside>
            </Grid>

            <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            InputProps={{ readOnly: true }}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>

                    {/* 🎯 Date Picker for Birth Date */}
                    <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Birth Date"
                                value={formData.birthDate ? dayjs(formData.birthDate) : null}
                                onChange={(newDate) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        birthDate: newDate.format("YYYY-MM-DD"),
                                    }))
                                }
                                disableFuture
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        disabled: !isEditable,
                                    },
                                }}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Employee Number"
                            name="employeeNumber"
                            value={formData.employeeNumber}
                            onChange={handleChange}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            label="National ID"
                            name="nationalId"
                            value={formData.nationalId}
                            onChange={handleChange}
                            error={!!errors.nationalId}
                            helperText={errors.nationalId}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>

                    {extraFields && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Current Password"
                                    name="currentPassword"
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="New Password"
                                    name="newPassword"
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => {
                                        handlePasswordChange(e);
                                        const newValue = e.target.value;
                                        setPasswordValidation({
                                            hasLowerUpper: /(?=.*[a-z])(?=.*[A-Z])/.test(newValue),
                                            hasNumber: /(?=.*\d)/.test(newValue),
                                            hasSpecialChar: /(?=.*[.!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(newValue),
                                            noConsecutive: !/(.)\1\1/.test(newValue),
                                            noTurkishChar: !/[çğıöşüÇĞİÖŞÜ]/.test(newValue),
                                            lengthValid: newValue.length >= 8 && newValue.length <= 16,
                                        });
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Paper elevation={1} sx={{ padding: 2, textAlign: "left", backgroundColor: "#f5f5f5" }}>
                                    <Typography variant="subtitle1" fontWeight="bold">Password Rules</Typography>
                                    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                        {[
                                            { rule: "Must contain one lowercase and one uppercase letter", passed: passwordValidation.hasLowerUpper },
                                            { rule: "Must contain a number", passed: passwordValidation.hasNumber },
                                            { rule: "Must contain a special character", passed: passwordValidation.hasSpecialChar },
                                            { rule: "Must not contain 3 consecutive characters", passed: passwordValidation.noConsecutive },
                                            { rule: "Must not contain Turkish characters", passed: passwordValidation.noTurkishChar },
                                            { rule: "Must be between 8-16 characters", passed: passwordValidation.lengthValid },
                                        ].map(({ rule, passed }) => (
                                            <li key={rule} style={{ display: "flex", alignItems: "center", color: passed ? "green" : "red" }}>
                                                {passed ? <CheckCircle fontSize="small" style={{ marginRight: "5px" }} /> : <Cancel fontSize="small" style={{ marginRight: "5px" }} />}
                                                {rule}
                                            </li>
                                        ))}
                                    </ul>
                                </Paper>
                            </Grid>

                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" onClick={handlePasswordUpdate}>
                                    Save New Password
                                </Button>
                            </Grid>
                        </>
                    )}

                    <Grid item xs={12}>
                        <ButtonGroup fullWidth>
                            <Button onClick={handleToggleEdit}>
                                {isEditable ? "Save Changes" : "Edit Profile"}
                            </Button>
                            <Button onClick={() => setExtraFields(!extraFields)}>
                                {extraFields ? "Hide Password Change" : "Change Password"}
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AdminInfo;