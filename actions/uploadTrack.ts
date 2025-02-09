'use server'

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { Readable } from "node:stream";
import { prisma } from "@/lib/prisma";
import formatDuration from '@/helpers/formatDuration';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uploadTrack(formData: FormData) {
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const img = formData.get('img') as File;
    const userId = '675d2238c7e432dab204ce32';
    
    if (!file || !title) {
        throw new Error('Missing required fields');
    }

    const audioBytes = await file.arrayBuffer();
    const audioBuffer = Buffer.from(audioBytes);

    let base64Image = null;
    if (img) {
        const imageBytes = await img.arrayBuffer();
        const imageBuffer = Buffer.from(imageBytes);
        base64Image = `data:${img.type};base64,${imageBuffer.toString('base64')}`;
    }

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'video',
                folder: 'music-app',
                eager: [{ audio_codec: 'none' }] // Triggers duration calculation
            },            
            async (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                try {
                    const duration = formatDuration(result!.duration);
                    await prisma.song.create({
                        data: {
                            title,
                            fileUrl: result!.secure_url,
                            artistId: userId,
                            image: base64Image,
                            duration:duration
                        }
                    });

                    revalidatePath('/');
                    resolve(result);
                } catch (dbError) {
                    reject(dbError);
                }
            }
        );

        const readableStream = new Readable();
        readableStream.push(audioBuffer);
        readableStream.push(null);
        readableStream.pipe(uploadStream);
    });
}