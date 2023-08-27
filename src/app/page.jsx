import { METAINFO } from '@utils/metaInfo';
import { PostList } from './_components/Posts/PostList';

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
