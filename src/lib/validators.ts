import { z } from "zod";

/**
 * REGISTER VALIDATION
 */
export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/**
 * LOGIN VALIDATION
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),

  password: z
    .string()
    .min(1, "Password is required"),
});

/**
 * FORGOT PASSWORD VALIDATION
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
});

/**
 * RESET PASSWORD VALIDATION
 */
export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),

  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});
