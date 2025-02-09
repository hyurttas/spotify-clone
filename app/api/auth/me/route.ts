// app/api/auth/me/route.ts
import {NextResponse} from 'next/server';
import {getUser} from '@/utils/auth';

export async function GET() {
    try {
        const user = await getUser();

        if (!user) {
            return NextResponse.json(
                {error: 'Not authenticated'},
                {status: 401}
            );
        }

        return NextResponse.json({user});
    } catch (error) {
        console.error('Auth error:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}