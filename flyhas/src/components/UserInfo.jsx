import React, { useState, useEffect } from "react";
import {
    Grid, Paper, TextField, ButtonGroup, Button, Avatar, Box, Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { CheckCircle, Cancel } from "@mui/icons-material";

const ItemInside = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "none",
    border: "none",
}));

const getInitials = (firstName, lastName) => {
    const f = firstName?.charAt(0)?.toUpperCase() || "";
    const l = lastName?.charAt(0)?.toUpperCase() || "";
    return `${f}${l}`;
};

const UserInfo = () => {
    const [isEditable, setIsEditable] = useState(false);
    const [extraFields, setExtraFields] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        nationalId: "",
        email: ""
    });

    const [errors, setErrors] = useState({});

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: ""
    });

    const [passwordValidation, setPasswordValidation] = useState({
        hasLowerUpper: false,
        hasNumber: false,
        hasSpecialChar: false,
        noConsecutive: true,
        noTurkishChar: true,
        lengthValid: false,
    });

    const token = localStorage.getItem("userToken");

    useEffect(() => {
        axios.get("http://localhost:8080/api/profile/customer", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setFormData(res.data))
            .catch((err) => console.error("Profil alınamadı:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email.";
        }

        if (formData.nationalId && !/^\d{11}$/.test(formData.nationalId)) {
            newErrors.nationalId = "National ID must be 11 digits.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));

        if (name === "newPassword") {
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

    const handleToggleEdit = () => {
        if (isEditable && validateForm()) handleSave();
        setIsEditable(!isEditable);
    };

    const handleSave = async () => {
        try {
            await axios.put("http://localhost:8080/api/profile/customer", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile updated successfully.");
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update profile.");
        }
    };

    const handlePasswordUpdate = async () => {
        if (!passwordData.newPassword) {
            alert("New password cannot be empty.");
            return;
        }

        const isValid = Object.values(passwordValidation).every(Boolean);
        if (!isValid) {
            alert("New password does not meet the required rules.");
            return;
        }

        try {
            await axios.put("http://localhost:8080/api/profile/customer/password", passwordData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Password updated successfully.");
            setExtraFields(false);
            setPasswordData({ currentPassword: "", newPassword: "" });
        } catch (err) {
            console.error("Password update error:", err);
            alert("Invalid current password.");
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
                            fullWidth label="First Name" name="firstName"
                            value={formData.firstName} onChange={handleChange}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth label="Last Name" name="lastName"
                            value={formData.lastName} onChange={handleChange}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth label="Email" name="email"
                            value={formData.email} onChange={handleChange}
                            InputProps={{ readOnly: true }}
                            error={!!errors.email} helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth label="Birth Date" name="birthDate" type="date"
                            value={formData.birthDate} onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ readOnly: !isEditable }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth label="National ID" name="nationalId"
                            value={formData.nationalId} onChange={handleChange}
                            InputProps={{ readOnly: !isEditable }}
                            error={!!errors.nationalId} helperText={errors.nationalId}
                        />
                    </Grid>

                    {extraFields && (
                        <Grid item xs={12}>
                            <Paper elevation={2} sx={{ padding: 2, backgroundColor: "#f5f5f5" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth label="Current Password"
                                            name="currentPassword" type="password"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth label="New Password"
                                            name="newPassword" type="password"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Password Rules
                                        </Typography>
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
                                                    {passed ? <CheckCircle fontSize="small" style={{ marginRight: 6 }} /> : <Cancel fontSize="small" style={{ marginRight: 6 }} />}
                                                    {rule}
                                                </li>
                                            ))}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant="contained" onClick={handlePasswordUpdate}>
                                            Save New Password
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
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

export default UserInfo;