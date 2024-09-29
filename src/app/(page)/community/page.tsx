'use client'

import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';

interface Subreddit {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  creatorId: string | null;
  _count?: {
    posts: number;
    subscribers: number;
  }
}

const page: React.FC = () => {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get<{ data: Subreddit[] }>('/api/subreddit');
        setSubreddits(response.data.data);
        setLoading(false);
      } catch (err) {
        const error = err as AxiosError;
        setError(error.message || 'Failed to fetch subreddits');
        setLoading(false);
      }
    };

    fetchSubreddits();
  }, []);

  if (loading) return <div>Loading subreddits...</div>;
  if (error) return <div>{error}</div>;

  if (!Array.isArray(subreddits)) {
    return <div>Error: Subreddits data is not in the expected format.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {subreddits.map((subreddit) => (
        <Link href={`/r/${subreddit.name}`} key={subreddit.id}>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle>{subreddit.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Created {formatDistanceToNow(new Date(subreddit.createdAt))} ago
              </p>
              {subreddit._count && (
                <div className="mt-2 text-xs text-gray-500">
                  <p>Posts: {subreddit._count.posts}</p>
                  <p>Subscribers: {subreddit._count.subscribers}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default page;