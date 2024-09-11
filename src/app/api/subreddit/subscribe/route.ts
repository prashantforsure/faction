import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubredditSubscriptionValidator } from '@/lib/validators/subreddit'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest){
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json({
                message: " unauthorised"
            },{
                status: 403
            })
        }
        const body = await req.json();
        const { subredditId } = SubredditSubscriptionValidator.parse(body)
        const subscriptionExits = await db.subscription.findFirst({
            where: {
                //@ts-ignore
                userId: session.user.id,
                subredditId
            }
        })
        if(subscriptionExits){
            return NextResponse.json({
                message: "already subscribe"
            },{
                status: 500
            })
        }
        await db.subscription.create({
            data: {
                //@ts-ignore
                userId: session.user.id,
                subredditId
            }
        })
        return NextResponse.json({
            message: "done"
        },{
            status: 200
        })
    }catch(e){
        return NextResponse.json({
            message: "done"
        },{
            status: 200
        })
    }
}