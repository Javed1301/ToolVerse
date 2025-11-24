import { NextRequest,NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false, // REQUIRED for large file uploads
  },
};

// Configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});

//Read documentation of this tonight.
interface CloudinaryUploadResult{
    public_id: string;
    bytes: Number;
    duration?: number;
    [key: string]: any;
} 

export async function POST(request: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if(
        ! process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
        ! process.env.CLOUDINARY_API_KEY &&
        ! process.env.CLOUDINARY_API_SECRET 
    ){
        return NextResponse.json({ error: 'Cloudinary is not configured properly' }, { status: 500 });
    }
    


    try {
       const formData =  await request.formData();
       const file = formData.get('file') as File | null;
       const title = formData.get('title') as string | null;
       const description = formData.get('description') as string | null;
       const originalSize = formData.get('originalSize') as string | null;

       if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
       }

       //This is the method to convert file(of any type) to buffer in nextjs
       const bytes = await file.arrayBuffer();
       const buffer = Buffer.from(bytes); 

       // Upload to Cloudinary. and promise will always get us a response that we have defined.
       const result = await new Promise<CloudinaryUploadResult>(
        (resolve, reject) => {
            const upload_stream =cloudinary.uploader.upload_stream(
                {
                    folder: 'nextjs-cloudinary-saas-videos',
                    resource_type: 'video',
                    transformation: [
                        { quality: 'auto' },
                        { fetch_format: 'mp4' }
                    ]

                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as CloudinaryUploadResult);
                }
            )
            upload_stream.end(buffer);
        })

        const video = await prisma.video.create({
            data: {
                publicId: result.public_id,
                title: title || 'Untitled',
                description: description || '',
                originalSize: String(originalSize),
                duration: result.duration || 0,
                compressedSize: String(result.bytes)
            }
        })
        return NextResponse.json(video);
    } catch (error) {
        console.error('Upload video failed:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
        
    }finally{
        await prisma.$disconnect();
    }
}