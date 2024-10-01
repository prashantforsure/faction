import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try{
        const session = await getAuthSession();

        if(!session?.user){
            return NextResponse.json({
                message: " unauthorised"
            },{
                status: 403
            })
        }
        const user = await db.user.findUnique({
            where: {
                id: session.user.id
            }
        })
        if (!user) {
            return NextResponse.json({
                message: "User not found"
            }, {
                status: 404
            });
        }
        const posts= await db.post.findMany({
            where: {
                authorId: session.user.id
            }
        })
        return NextResponse.json({
            posts
        }, {
            status: 200
        }
        )
    }catch(error){
        console.error(error);
        return NextResponse.json({
            message: "Something went wrong"
        }, {
            status: 500
        });
    }
}