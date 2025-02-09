import 'server-only'
import {jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {SessionPayload} from "@/lib/zodDefinition";
import {prisma} from "@/lib/prisma";

const key = new TextEncoder().encode(process.env.SESSION_KEY);

const cookie = {
    name: 'session',
    options: {httpOnly: true, secure: true, sameSite: 'lax', path: '/'},
    duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(key);
}

export async function decrypt(session: any) {
    try {
        const {payload} = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        });
        return payload
    } catch (error) {
        return null
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({userId: userId, expiresAt: expiresAt});

    const data = await prisma.session.create({
        data: {
            userId: userId,
            expires: expiresAt,
            sessionToken: session,
        }
    });


    const cookieStore = await cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

export async function verifySession() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return {isAuth: true, userId: Number(session.userId)};
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/login');
}