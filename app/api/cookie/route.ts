import {NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import {prisma} from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.email || !body.password || !body.name) {
            return NextResponse.json({error: 'All fields are required'}, {status: 400});
        }

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {email: body.email},
                    {userName: body.name}
                ]
            }
        });

        if (existingUser) {
            const field = existingUser.email === body.email ? 'Email' : 'Username';
            return NextResponse.json({error: `${field} already exists`}, {status: 400});
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                userName: body.name,
                name: body.name,
                hashedPassword
            }
        });

        return NextResponse.json({
            message: 'User registered successfully',
            user: {
                email: user.email,
                name: user.userName,
                createdAt: user.createdAt
            }
        }, {status: 201});

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            {error: 'Registration failed. Please try again.'},
            {status: 500}
        );
    }
}