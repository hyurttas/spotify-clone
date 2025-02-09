import {prisma} from "@/lib/prisma";

export default async function Queue() {
    try {
        const songs = await prisma.song.findMany({
            include: {
                artist: {
                    select: {name: true}
                }
            },
            take: 10,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return songs;
    } catch (error) {
        console.error('Failed to fetch songs:', error);
        throw new Error('Failed to fetch songs');
    }
}