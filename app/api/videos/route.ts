import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const { userId } = await auth(); 

    if (!userId) {
        throw new Error("You must be logged in");
    }
    // console.log("Fetching videos for user:", userId);
    try {
        const videos = await prisma.video.findMany({
            where:{
                userId:userId
            },
            orderBy:{
                createdAt:"desc"    
            }
        });

        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({error: "Failed to fetch videos"}, {status: 500});
    }finally{
        await prisma.$disconnect();
    }
}