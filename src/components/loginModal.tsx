import React, { useContext, useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import endpoints from '../resources/endpoints';
import { TokenContext } from '../App';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface LoginModalProps {
    open: boolean;
    handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setToken, token } = useContext(TokenContext);

    const signInOnClick = async () => {
        const { method, url } = endpoints.login;
        try {
            const response = await axios.request({
                url,
                method,
                data: {
                    email,
                    password
                }
            });
            console.log('Login successful:', response.data);
            handleClose();
            setToken(response.data.access_token);
            // Handle successful login (e.g., store token, redirect, etc.)
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid email or password');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="login-modal-title" variant="h6" component="h2">
                    Login
                </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && (
                    <Typography color="error" variant="body2">
                        {error}
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={signInOnClick}
                >
                    Sign In
                </Button>
            </Box>
        </Modal>
    );
};

export default LoginModal;
