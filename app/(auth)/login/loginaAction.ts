'use server'
import {prisma} from "@/lib/prisma";
import {cookies} from 'next/headers';
import {z} from "zod";
import jwt from "jsonwebtoken";

// Cookie configuration
const COOKIE_CONFIG = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/'
};

// Input Validation Schema
const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .max(100, 'Password is too long')
});

// Delete old tokens
async function deleteOldTokens(userId: string) {
    try {
        await prisma.refreshToken.deleteMany({
            where: {
                userId: userId,
                expiresAt: {
                    lt: new Date()
                }
            }
        });
    } catch (error) {
        console.error('Error deleting old tokens:', error);
    }
}

// Token Creation Function
async function createTokens(userId: string, email: string) {
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
        throw new Error('Token secrets are not configured');
    }

    // Delete any expired tokens for this user
    await deleteOldTokens(userId);

    // Create access token (short-lived)
    const accessToken = jwt.sign(
        {id: userId, email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    );

    // Create refresh token (long-lived)
    const refreshToken = jwt.sign(
        {id: userId, tokenId: uuidv4()},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );

    // Store refresh token in database
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: userId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
    });

    return {accessToken, refreshToken};
}

export async function handleSubmit(formData: FormData) {
    try {
        // Extract and validate input
        const rawData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        // Validate input using Zod
        const validatedData = LoginSchema.parse(rawData);

        // Find user by email
        const user = await prisma.user.findUnique({
            where: {email: validatedData.email}
        });

        // Handle user not found
        if (!user) {
            return {
                success: false,
                error: 'Invalid email or password.'
            };
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
            validatedData.password,
            user.hashedPassword as string
        );

        // Handle invalid password
        if (!isPasswordValid) {
            return {
                success: false,
                error: 'Invalid email or password.'
            };
        }

        // Generate authentication tokens
        const {accessToken, refreshToken} = await createTokens(
            user.id,
            user.email
        );

        const cookieStore = await cookies();

        // Clear any existing tokens
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');

        // Set new tokens
        cookieStore.set('access_token', accessToken, {
            ...COOKIE_CONFIG,
            maxAge: 15 * 60 // 15 minutes
        });

        cookieStore.set('refresh_token', refreshToken, {
            ...COOKIE_CONFIG,
            maxAge: 7 * 24 * 60 * 60 // 7 days
        });

        // Return user data without sensitive information
        const userData = {
            id: user.id,
            email: user.email,
            name: user.name
        };

        return {
            success: true,
            redirect: '/',
            user: userData
        };

    } catch (error: any) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return {
                success: false,
                error: error.errors[0].message
            };
        }

        // Log unexpected errors
        console.error('Login error:', error);

        // Delete cookies if there's an error
        const cookieStore = await cookies();
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');

        return {
            success: false,
            error: 'An unexpected error occurred. Please try again.'
        };
    }
}

// Optional: Logout function
export async function handleLogout() {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refresh_token')?.value;

        // Delete refresh token from database if it exists
        if (refreshToken) {
            await prisma.refreshToken.deleteMany({
                where: {
                    token: refreshToken
                }
            });
        }

        // Clear cookies
        cookieStore.delete('access_token');
        cookieStore.delete('refresh_token');

        return {
            success: true,
            redirect: '/login'
        };
    } catch (error) {
        console.error('Logout error:', error);
        return {
            success: false,
            error: 'Failed to logout'
        };
    }
}