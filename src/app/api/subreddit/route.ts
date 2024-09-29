
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { SubredditValidator } from '@/lib/validators/subreddit'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: NextRequest) {
    try{
        const session = await getAuthSession();
        if(!session?.user){
            return NextResponse.json({
                message: "unauthenticated"
            }, {
                status: 401
            })
        }
        const body = await req.json();

        const { name } = SubredditValidator.parse(body);
        const subredditExists = await db.subreddit.findFirst({
        where: {
          name,
        }
       })
       if(subredditExists){
        return NextResponse.json({
            message: "subreddit alreasy exits"
        },{
            status: 409
        })
       }
       const subreddit = await db.subreddit.create({
        data: {
            name,
            //@ts-ignore
            creatorId: session.user.id,
        }
       })
       await db.subscription.create({
        data: {
            //@ts-ignore
            userId: session.user.id,
            subredditId: subreddit.id,
        },
       })
       return new Response(subreddit.name)
    }catch(e){
     console.log(e);
     return NextResponse.json({
        error: "something went wrong"
     },{
        status: 500
     })
    }
}

export async function GET(req: NextRequest) {
    try {
        const subreddits = await db.subreddit.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20,
        });

        return NextResponse.json({
            data: subreddits  
        });
    }
    catch (e) {
        console.error('Error fetching subreddits:', e);
        return NextResponse.json({
            error: "An error occurred while fetching subreddits"
        }, {
            status: 500
        });
    }
}