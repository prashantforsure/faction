import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CommentVoteValidator, PostVoteValidator } from '@/lib/validators/vote';
import { NextRequest } from 'next/server'

import { z } from 'zod'

export async function PATCH(req: NextRequest){
    try{
        const session = await getAuthSession();
        const body = await req.json();
        const { commentId , voteType } = CommentVoteValidator.parse(body)

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
          }

        const existingVote = await db.commentVote.findFirst({
            where: {
                //@ts-ignore
                userId: session.user.id,
                commentId,

            }
        })
        if(existingVote){
            await db.commentVote.delete({
                where: {
                    userId_commentId: {
                        commentId,
                        //@ts-ignore
                        userId: session.user.id,
                      },

                }
            })
            
        }else{
            await db.commentVote.update({
                where: {
                    userId_commentId: {
                        commentId,
                        //@ts-ignore
                        userId: session.user.id,
                      },
                }, 
                data: {
                    
                }
            })
        }
    }
}