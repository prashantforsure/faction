'use client'

import React, { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { Users, MessageSquare, TrendingUp } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Subreddit {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  creatorId: string | null
  _count?: {
    posts: number
    subscribers: number
  }
}

export default function SubredditList() {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get<{ data: Subreddit[] }>('/api/subreddit')
        setSubreddits(response.data.data)
        setLoading(false)
      } catch (err) {
        const error = err as AxiosError
        setError(error.message || 'Failed to fetch subreddits')
        setLoading(false)
      }
    }

    fetchSubreddits()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {[...Array(5)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) return <div className="text-center py-10 text-red-500">{error}</div>

  if (!Array.isArray(subreddits)) {
    return <div className="text-center py-10 text-red-500">Error: Subreddits data is not in the expected format.</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Discover Communities</h1>
      <div className="space-y-4">
        {subreddits.map((subreddit) => (
          <Link href={`/r/${subreddit.name}`} key={subreddit.id} className="block">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500">
                    <AvatarFallback>{subreddit.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold">r/{subreddit.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      Created {formatDistanceToNow(new Date(subreddit.createdAt))} ago
                    </p>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Trending
                  </Badge>
                </div>
                {subreddit._count && (
                  <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{subreddit._count.subscribers.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>{subreddit._count.posts.toLocaleString()} posts</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}