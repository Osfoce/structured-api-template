import { string, z } from 'zod';

export const registerSchema = z.object({
    username: z.string()
        .min(5)
        .trim()
        .toLowerCase(),
    email: z.string()
        .email()
        .toLowerCase(),
    password: z.string()
        .min(8)
});

export const loginSchema = z.object({
    email: z.string()
        .email()
        .toLowerCase(),
    password: z.string()
        .min(8)
});

