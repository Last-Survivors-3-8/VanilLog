import { PostList } from '@src/app/components/PostList/PostList';
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
