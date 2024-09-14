import MiniCreatePost from '@/components/MiniCreatePost'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import React from 'react'

interface ParamsProps {
    params: {
        slug : string
    }

}
const page = async ({ params }: ParamsProps) => {
    const { slug } = params
    const session = await getAuthSession();
    if(!session){
        return alert("user not logged in")
    }
    const subreddit = await db.subreddit.findFirst({
        where: {
            name: slug
        },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    subreddit: true
                }
            }
        }
    })
    if(!subreddit){
        return <p>subreddit not found</p>
    }
  return (
    <>
    <h1 className='font-bold text-3xl md:text-4xl h-14'>
        r/{subreddit.name}
    </h1>
    <MiniCreatePost session={session} />
    </>
  )
}

export default page