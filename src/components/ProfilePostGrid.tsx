import React from 'react';
import ProfilePost from './ProfilePost';  // Adjust the import path as needed
import { Suspense } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
interface Post {
  id: string;
  title: string;
  content: {
    blocks: Array<{
      type: string;
      data: {
        text: string;
      };
    }>;
  };
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
  };
  subreddit: {
    name: string;
  };
  comments: Array<any>;
  votes: Array<{
    type: 'UP' | 'DOWN';
  }>;
}

interface ProfilePostsGridProps {
  posts: Post[];
}

const ProfilePostsGrid: React.FC<ProfilePostsGridProps> = ({ posts }) => {
  return (
    
    <main className="md:col-span-2 justify-center">
    <Card>
      <CardHeader>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<div>Loading feed...</div>}>
        
        {posts.map((post) => (
        <ProfilePost key={post.id} post={post} />
      ))}
        </Suspense>
      </CardContent>
    </Card>
  </main>
   
  );
};

export default ProfilePostsGrid;