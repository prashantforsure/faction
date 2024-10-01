import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ArrowUp, ArrowDown } from 'lucide-react';

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
  author?: {
    username: string;
  };
  subreddit?: {
    name: string;
    
  };
  
  comments?: Array<any>;
  votes?: Array<{
    type: 'UP' | 'DOWN';
  }>;
}

interface ProfilePostProps {
  post: Post;
}

const ProfilePost: React.FC<ProfilePostProps> = ({ post }) => {
 

  return (
    <div className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        {post.subreddit && <span>r/{post.subreddit.name}</span>}
        {post.subreddit && <span>•</span>}
        <span>Posted by u/{post.author?.username}</span>
        <span>•</span>
        <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
      </div>
      <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
      <div className="mt-2">
        {post.content.blocks.map((block, index) => (
          <p key={index} className="mt-1">
            {block.data.text}
          </p>
        ))}
      </div>
      <div className="flex items-center space-x-4 mt-4">
        <div className="flex items-center space-x-1">
          <ArrowUp size={20} />
        
          <ArrowDown size={20} />
        </div>
        <div className="flex items-center space-x-1">
          <MessageSquare size={20} />
          <span>{post.comments?.length} comments</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;