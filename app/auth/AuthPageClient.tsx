"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { TextField, Button, Box, Typography, Alert, CircularProgress, InputAdornment } from "@mui/material";
import { Email, Lock, PersonAdd, Login } from "@mui/icons-material";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Check for error from URL (NextAuth redirects)
    useEffect(() => {
        const urlError = searchParams?.get("error");
        if (urlError && urlError !== "undefined") {
            setError("Authentication failed. Please try again.");
        }
    }, [searchParams]);

    const submit = async () => {
        setError("");
        setLoading(true);

        try {
            if (isLogin) {
                // Use NextAuth signIn for login
                const res = await signIn("credentials", {
                    email: email.toLowerCase().trim(),
                    password,
                    redirect: false,
                });

                console.log("SignIn response:", res);

                if (!res?.error && res?.ok) {
                    // Successfully logged in
                    console.log("✅ Login successful, redirecting...");
                    // Get callback URL or default to home
                    const callbackUrl = searchParams?.get("callbackUrl") || "/";
                    // Small delay to ensure session is set
                    await new Promise((resolve) => setTimeout(resolve, 200));
                    router.push(callbackUrl);
                    setSuccess('Login successful')
                    router.refresh(); // Refresh to update session
                } else {
                    console.error("❌ Login error:", res?.error);
                    const errorMessage = res?.error === "CredentialsSignin"
                        ? "Invalid email or password"
                        : res?.error || "Login failed. Please try again.";
                    setError(errorMessage);
                }
            } else {
                // Register first, then auto-login
                const res = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });
                if (res.ok) {
                    router.push("/auth");
                    setSuccess("Account created successfully! Please login with your credentials.");
                    setIsLogin(true);
                    router.refresh(); // Refresh to update session
                } else {
                    const data = await res.json();
                    setError(data.error || "Error occurred. Please try again.");
                }
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !loading) {
            submit();
        }
    };

    return (
        <Box className="auth-container">
            <Box className="auth-card">
                {/* Header */}
                <Box className="auth-header">
                    <Box className="auth-icon-wrapper">
                        {isLogin ? (
                            <Login className="auth-icon" />
                        ) : (
                            <PersonAdd className="auth-icon" />
                        )}
                    </Box>
                    <Typography variant="h4" className="auth-title">
                        {isLogin ? "Welcome Back" : "Create Account"}
                    </Typography>
                    <Typography variant="body2" className="auth-subtitle">
                        {isLogin
                            ? "Sign in to continue to your account"
                            : "Get started by creating your account"}
                    </Typography>
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" className="auth-alert" onClose={() => setError("")}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert
                        severity="success"
                        className="auth-alert"
                        onClose={() => setSuccess("")}
                    >
                        {success}
                    </Alert>
                )}

                {/* Form */}
                <Box className="auth-form">
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your email"
                        className="auth-input"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email className="input-icon" />
                                </InputAdornment>
                            ),
                        }}
                        disabled={loading}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your password"
                        className="auth-input"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock className="input-icon" />
                                </InputAdornment>

                            ),
                        }}
                        disabled={loading}
                        margin="normal"
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={submit}
                        disabled={loading || !email || !password}
                        className="auth-button"
                        size="large"
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            isLogin ? "Sign In" : "Create Account"
                        )}
                    </Button>
                </Box>

                {/* Toggle Login/Register */}
                <Box className="auth-toggle">
                    <Typography variant="body2" className="auth-toggle-text">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                    </Typography>
                    <Button
                        variant="text"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                        }}
                        className="auth-toggle-button"
                        disabled={loading}
                    >
                        {isLogin ? "Sign Up" : "Sign In"}
                    </Button>
                </Box>
            </Box>

            {/* Background decoration */}
            <Box className="auth-background">
                <Box className="auth-blob auth-blob-1" />
                <Box className="auth-blob auth-blob-2" />
                <Box className="auth-blob auth-blob-3" />
            </Box>
        </Box>
    );
}
