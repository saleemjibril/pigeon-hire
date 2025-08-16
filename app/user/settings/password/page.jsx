"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { changeUserPassword } from "../../../apis/userProfile";

const getCookie = (name) => {
    if (typeof window === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2)
        return decodeURIComponent(parts.pop().split(";").shift());
    return null;
};

// Helper function to mask email for security display
const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) return email;
    
    // Show first 2 characters, then asterisks, then last 2 characters before @
    const visibleStart = localPart.slice(0, Math.min(2, localPart.length));
    const visibleEnd = localPart.length > 4 ? localPart.slice(-2) : '';
    const asterisks = '*'.repeat(Math.max(6, localPart.length - 4));
    
    return `${visibleStart}${asterisks}${visibleEnd}@${domain}`;
};

export default function SettingsPassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    
    // Get user info and token from Redux store
    const { userInfo, token: reduxToken } = useSelector((state) => state.auth);

    // Get token from multiple sources
    const getToken = () => {
        return (
            reduxToken ||
            getCookie("auth_token") ||
            (typeof window !== "undefined"
                ? localStorage.getItem("auth_token")
                : null)
        );
    };

    // Get userId and userEmail from userInfo
    const userId = userInfo?.user?.id || userInfo?.id;
    const userEmail = userInfo?.user?.email || userInfo?.email;
    const token = getToken();

    const handleClickShowCurrentPassword = () => {
        setShowCurrentPassword(!showCurrentPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = async () => {
        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("All fields are required");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const passwordData = {
                currentPassword,
                newPassword,
                confirmPassword: newPassword,
            };

            const response = await changeUserPassword(
                userId,
                passwordData,
                token
            );

            if (response.status === 200) {
                setSuccess("Password changed successfully!");
                // Reset form
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
                // Exit editing mode after a delay
                setTimeout(() => {
                    setIsEditing(false);
                    setSuccess("");
                }, 2000);
            }
        } catch (error) {
            console.error("Password change error:", error);
            setError(
                error.response?.data?.message || "Failed to change password"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        setSuccess("");
        setIsEditing(false);
    };

    return (
        <div className='password'>
            <div className='settings-contact__inner__header'>
                <div>Password and Security</div>
                {!isEditing && (
                    <div className='pointer' onClick={() => setIsEditing(true)}>
                        <Image
                            alt='Edit'
                            width={50}
                            height={18}
                            src={"/assets/icons/edit.svg"}
                        />
                    </div>
                )}
            </div>

            {/* Display messages */}
            {error && (
                <div
                    style={{
                        color: "red",
                        marginBottom: "10px",
                        padding: "10px",
                        backgroundColor: "#ffe6e6",
                        borderRadius: "4px",
                    }}
                >
                    {error}
                </div>
            )}
            {success && (
                <div
                    style={{
                        color: "green",
                        marginBottom: "10px",
                        padding: "10px",
                        backgroundColor: "#e6ffe6",
                        borderRadius: "4px",
                    }}
                >
                    {success}
                </div>
            )}

            {/* Security Notice */}
            <div className='password__disclaimer'>
                <Image
                    alt=''
                    width={16}
                    height={16}
                    src={"/assets/icons/info.svg"}
                />
                <div>
                    To protect your account, please complete this verification.
                </div>
            </div>

            {/* Email Display */}
            <div className='password__grid'>
                <div>Email:</div>
                <div style={{ fontWeight: 'bold' }}>{maskEmail(userEmail)}</div>
            </div>

            {!isEditing ? (
                // Display mode - show masked password
                <div className='password__group'>
                    <label htmlFor=''>Password:</label>
                    <OutlinedInput
                        className='password__group__input'
                        id='display-password'
                        name='display-password'
                        type='password'
                        value='••••••••••••'
                        disabled
                    />
                </div>
            ) : (
                // Edit mode - show password change form
                <>
                    <div className='password__group'>
                        <label htmlFor=''>Current password:</label>
                        <OutlinedInput
                            className='password__group__input'
                            required
                            id='current-password'
                            name='current-password'
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder='Enter current password'
                            value={currentPassword}
                            onChange={(e) => {
                                setCurrentPassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowCurrentPassword}
                                        edge='end'
                                    >
                                        {showCurrentPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <br />

                    <div className='password__group'>
                        <label htmlFor=''>New password:</label>
                        <OutlinedInput
                            className='password__group__input'
                            required
                            id='new-password'
                            name='new-password'
                            type={showNewPassword ? "text" : "password"}
                            placeholder='Enter new password'
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle new password visibility'
                                        onClick={handleClickShowNewPassword}
                                        edge='end'
                                    >
                                        {showNewPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <br />

                    <div className='password__group'>
                        <label htmlFor=''>Confirm password:</label>
                        <OutlinedInput
                            className='password__group__input'
                            required
                            id='confirm-password'
                            name='confirm-password'
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm new password'
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle confirm password visibility'
                                        onClick={handleClickShowConfirmPassword}
                                        edge='end'
                                    >
                                        {showConfirmPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </div>
                    <br />
                    <br />

                    <div className='settings-contact__button-group'>
                        <button onClick={handleCancel} disabled={loading}>
                            Cancel
                        </button>
                        <button
                            onClick={handlePasswordChange}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save changes"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}