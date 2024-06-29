import { Post as PostType } from '@/lib/converters/posts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import ReactTimeAgo from 'react-timeago';
import { BadgeCheck } from 'lucide-react';

export default function Post({ post }: { post: PostType }) {
  return (
    <div className="flex items-center space-x-2 border-t p-4 rounded">
      <Avatar>
        <AvatarImage src={post.user_image} alt="@shadcn" />
        <AvatarFallback className="bg-green-400 text-white">
          {post.user_full_name[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <h4 className="font-semibold">{post.user_full_name}</h4>
          {post.is_mentor && <BadgeCheck color="#4ade80" />}
          <p className="font-light text-sm">
            <ReactTimeAgo date={post.created_at.toDate()} />
          </p>
        </div>
        <p>{post.post}</p>
      </div>
    </div>
  );
}
