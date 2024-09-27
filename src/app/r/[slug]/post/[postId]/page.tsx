import CommentsSection from '@/components/CommentsSection'
import EditorOutput from '@/components/EditorOutput'
import PostVoteServer from '@/components/post-vote/PostVoteServer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { db } from '@/lib/db'

import { formatTimeToNow } from '@/lib/utils'

import { Post, User, Vote } from '@prisma/client'
import { ArrowBigDown, ArrowBigUp, Loader2, MessageSquare, Share2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import redis from '@/lib/redis'
import { CachedPost } from '@/types/redis'

interface SubRedditPostPageProps {
  params: {
    postId: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const SubRedditPostPage = async ({ params }: SubRedditPostPageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost

  let post: (Post & { votes: Vote[]; author: User }) | null = null

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    })
  }

  if (!post && !cachedPost) return notFound()

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center space-x-4 pb-4 border-b">
          <Suspense fallback={<PostVoteShell />}>
           
            <PostVoteServer
              postId={post?.id ?? cachedPost.id}
              getData={async () => {
                return await db.post.findUnique({
                  where: {
                    id: params.postId,
                  },
                  include: {
                    votes: true,
                  },
                })
              }}
            />
          </Suspense>
          <div className="flex-grow">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={`https://avatar.vercel.sh/${post?.author.username ?? cachedPost.authorUsername}`} />
                <AvatarFallback>{(post?.author.username ?? cachedPost.authorUsername)[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-500">
                Posted by u/{post?.author.username ?? cachedPost.authorUsername}{' '}
                {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
              </p>
            </div>
            <h1 className="text-xl font-semibold mt-2 text-gray-900">
              {post?.title ?? cachedPost.title}
            </h1>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <EditorOutput content={post?.content ?? cachedPost.content} />
        </CardContent>
        <CardFooter className="border-t flex justify-between items-center">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <MessageSquare className="w-4 h-4 mr-2" />
            Comments
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardContent className="pt-4">
          <Suspense fallback={<Loader2 className='h-5 w-5 animate-spin text-zinc-500' />}>
            {/* @ts-expect-error Server Component */}
            <CommentsSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

function PostVoteShell() {
  return (
    <div className='flex items-center flex-col pr-6 w-20'>
      <Button variant="ghost" size="sm" className="px-0">
        <ArrowBigUp className='h-5 w-5 text-zinc-700' />
      </Button>
      <div className='text-center py-2 font-medium text-sm text-zinc-900'>
        <Loader2 className='h-3 w-3 animate-spin' />
      </div>
      <Button variant="ghost" size="sm" className="px-0">
        <ArrowBigDown className='h-5 w-5 text-zinc-700' />
      </Button>
    </div>
  )
}

export default SubRedditPostPage