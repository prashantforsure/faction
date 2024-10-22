import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CommentValidator } from '@/lib/validators/comment';
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const { postId, text, replyToId } = CommentValidator.parse(body)
        const session = await getAuthSession();
        
        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
          }

          const comment = await db.comment.create({
            data: {
                text,
                postId,
                replyToId,
                //@ts-ignore
                authorId: session.user.id,
            }
          })
          return NextResponse.json({
            message: "commented"
          },{
            status: 200
          })
    }catch(e){
        console.log(e);
        return NextResponse.json({
            message: "something went wrong"
          },{
            status: 500
          })
    }
}