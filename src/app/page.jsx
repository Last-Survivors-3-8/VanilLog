import { PostList } from '@src/components/Postlist/PostList';
import { METAINFO } from '@utils/metaInfo';

export const metadata = {
  title: METAINFO.HOME.TITLE,
  description: METAINFO.HOME.DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <PostList />
    </>
  );
}
