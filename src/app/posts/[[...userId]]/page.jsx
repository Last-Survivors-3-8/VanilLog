import { PostList } from '@src/components/Posts/PostList';
import { METAINFO } from 'constants/metaInfo';
import axios from 'axios';
import { PageDivider } from '@src/components/PageDivider';

export async function generateMetadata({ params }) {
  const userId = params.userId ? params.userId[0] : '';
  try {
    const user = await axios(`${process.env.DOMAIN}/api/v1/profile/${userId}`);
    const userData = user.data.data;

    return {
      title: userData.nickname,
      description: `${userData.nickname}님의 블로그입니다. 포스트 수 ${userData.blogPosts?.length}`,
    };
  } catch (error) {
    return {
      title: METAINFO.BLOG_HOME.TITLE,
      description: METAINFO.BLOG_HOME.DESCRIPTION,
    };
  }
}

export default function Posts({ params }) {
  const userId = params.userId ? params.userId[0] : '';
  return (
    <>
      {userId && <PageDivider blogUserId={userId} />}
      <PostList blogUserId={userId} />
    </>
  );
}
