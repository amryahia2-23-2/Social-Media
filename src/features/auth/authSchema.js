import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$! %*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character")
});

export const registerSchema = z.object({
    name: z
        .string()
        .nonempty("Full name is required")
        .min(3, "Full name mut be at least 3 charaters")
        .max(20, "Full name mut be at must 20 charaters"),
    username: z
        .string()
        .optional()
        .or(z.literal("")),
    email: z
        .string()
        .nonempty("Email is required")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"),
    gender: z.enum(["male", "female"], {
        errorMap: () => ({ message: "gender is required" }),
    }),
    dateOfBirth: z
        .string()
        .nonempty("Birth of Date is required")
        .min(1, "Please select your birth date")
        .refine((date) => {
            const birthDate = new Date(date);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();

            const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

            return actualAge >= 16 && actualAge <= 70;
        }, "Age must be between 16 and 70 years"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$! %*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character"),
    rePassword: z
        .string()
        .nonempty("Please confirm your password")
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$! %*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character")
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
});

export const changePasswordSchema = z.object({
    currentPassword: z
        .string()
        .nonempty("Current password is required")
        .min(8, "Password must be at least 8 characters"),
    newPassword: z
        .string()
        .nonempty("New password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$! %*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Minimum eight characters, at least one letter, one number and one special character"),
    confirmPassword: z
        .string()
        .nonempty("Please confirm your new password")
        .min(8, "Password must be at least 8 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
}).refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
});
