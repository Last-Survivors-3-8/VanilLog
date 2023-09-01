import Link from 'next/link';
import { PostItem } from './PostItem';

function PostsGrid({ posts }) {
  return (
    <div className='flex justify-center flex-wrap gap-x-8 gap-y-4'>
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className='border-solid border-white border-8 shadow-md'
          >
            <Link href={`/post/${post.author}/${post._id}`}>
              <PostItem post={post} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export { PostsGrid };
