import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PostValidator } from '@/lib/validators/post'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'


export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const { title, content, subredditId } = PostValidator.parse(body)
        const session = await getAuthSession();

        if(!session?.user){
            return NextResponse.json({
                message: " unauthorised"
            },{
                status: 403
            })
        }
        const subscription = await db.subscription.findFirst({
            where: {
                subredditId,
                //@ts-ignore
                userId: session.user.id,
                
            }
        })
        if(!subscription){
            return NextResponse.json({
                message: "user is not subscribed"
            })
        }
        await db.post.create({
            data: {
                title,
                content,
                //@ts-ignore
                authorId: session.user.id,
                subredditId,
            }
        })
        return NextResponse.json({
            message: "posted"
        })
    }catch(e){
        return NextResponse.json({
            message: "something went wrong"
        })
    }
}