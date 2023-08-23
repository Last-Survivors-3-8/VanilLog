import { PostList } from '@src/components/PostList/PostList';
import Ga4Page from '@src/components/ga4';
import { METAINFO } from '@utils/metaInfo';

export const metadata = {
  title: METAINFO.HOME.TITLE,
  description: METAINFO.HOME.DESCRIPTION,
};

export default function Home() {
  return (
    <>
      <Ga4Page />
      <PostList />
    </>
  );
}
