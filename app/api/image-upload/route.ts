import { NextRequest,NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
});

//Read documentation of this tonight.
interface ClouinaryUploadResult{
    public_id: string;
    [key: string]: any;
} 

export async function POST(request: NextRequest) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
       const formData =  await request.formData();
       const file = formData.get('file') as File | null;

       if (!file) {
        return NextResponse.json({ error: 'No file provided' }, { status: 400 });
       }

       //This is the method to convert file(of any type) to buffer in nextjs
       const bytes = await file.arrayBuffer();
       const buffer = Buffer.from(bytes); 

    //    console.log(bytes)

       // Upload to Cloudinary. and promise will always get us a response that we have defined.
       const result = await new Promise<ClouinaryUploadResult>(
        (resolve, reject) => {
            const upload_stream =cloudinary.uploader.upload_stream(
                {
                    folder: 'nextjs-cloudinary-saas-images',
                    resource_type: 'image'

                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as ClouinaryUploadResult);
                }
            )
            upload_stream.end(buffer);
        })

        return NextResponse.json({ publicId: result.public_id }, { status: 200 });
    } catch (error) {
        console.error('Upload Image failed:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
        
    }
}