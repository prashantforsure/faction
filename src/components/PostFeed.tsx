'use client'

import React, { useEffect } from 'react'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import Post from './Post'
import { ExtendedPost } from '@/types/db'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subredditName?: string
}

const PostFeed: React.FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
  const { ref, entry } = useIntersection({
    root: null,
    threshold: 1,
  })

  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<ExtendedPost[]>({
    queryKey: ['infinite-query', subredditName],
    queryFn: async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
        (subredditName ? `&subredditName=${subredditName}` : '')

      const { data } = await axios.get<ExtendedPost[]>(query)
      return data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return allPages.length + 1
    },
    initialData: { pages: [initialPosts], pageParams: [1] },
  })

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post, index) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user?.id
        )

        return (
          <li key={post.id} ref={index === posts.length - 1 ? ref : null}>
            <Post
              post={post}
              commentAmt={post.comments.length}
              subredditName={post.subreddit.name}
              votesAmt={votesAmt}
              currentVote={currentVote}
            />
          </li>
        )
      })}

      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
    </ul>
  )
}

export default PostFeed