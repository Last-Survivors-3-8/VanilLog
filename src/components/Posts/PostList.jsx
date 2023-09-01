'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ERRORS } from 'constants/errors';
import { Pagination } from './Pagination';
import { PostsGrid } from './PostsGrid';

function PostList({ blogUserId }) {
  const params = useSearchParams();

  const searchValue = params.get('q');
  const page = params.get('page') || 1;
  const limit = params.get('limit') || 10;

  const { data } = useSession();
  const loggedInUserId = data?.mongoId;

  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState('포스트 작성하기');
  const [error, setError] = useState(null);

  const searchApi = blogUserId
    ? `/api/v1/posts/search/${blogUserId}`
    : '/api/v1/posts/search';
  const postListApi = '/api/v1/posts';

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = searchValue
          ? await axios.get(searchApi, {
              params: { q: searchValue, page, limit },
            })
          : await axios.get(postListApi, {
              params: { userId: blogUserId, page, limit },
            });

        if (response.data.status !== 200) {
          setError(response.data.message);
          return;
        }

        setPosts(response.data.data);
        setTotalPosts(response.data.totalPosts);
      } catch (e) {
        setError(ERRORS.POST_LOADING_ERROR);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [blogUserId, page, limit, searchValue, searchApi]);

  const totalPage = Math.ceil(totalPosts / limit);
  const currentPage = parseInt(page, 10);
  const itemsPerPageGroup = 10;

  const startPage =
    Math.floor((currentPage - 1) / itemsPerPageGroup) * itemsPerPageGroup + 1;
  const endPage = Math.min(startPage + itemsPerPageGroup - 1, totalPage);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='px-5 mt-[22px] mx-auto'>
      {error && <div>{error}</div>}
      {isLoading ? (
        <div className='flex justify-center items-center h-[50vh]'>
          로딩 중...
        </div>
      ) : (
        <>
          {searchValue && (
            <div className='block ml-20 mb-10 mt-10'>
              {blogUserId && '이 블로그에서'} {searchValue}(으)로 검색한
              결과입니다
            </div>
          )}
          {posts.length > 0 ? (
            <PostsGrid posts={posts} />
          ) : (
            <div className='flex justify-center items-center h-[50vh]'>
              {searchValue
                ? '검색 결과가 없습니다.'
                : '현재 작성된 포스트가 없습니다.'}
            </div>
          )}
          <Pagination
            currentPage={parseInt(page, 10)}
            totalPage={Math.ceil(totalPosts / limit)}
            blogUserId={blogUserId}
            searchValue={searchValue}
            limit={limit}
          />
          <div className='flex justify-end mr-4'>
            <button
              style={{
                minWidth: '200px',
                maxWidth: '300px',
                minHeight: '50px',
                maxHeight: '50px',
              }}
              className={`text-xl font-bold py-2 px-8 ${
                loggedInUserId || buttonText !== '로그인 후 작성 가능'
                  ? 'text-white bg-[#6B99C3] border-4 border-white border-inherit rounded-full hover:bg-[#16354D] hover:text-[#E4E5EA]'
                  : ''
              }`}
              disabled={!loggedInUserId}
              onMouseOver={() => {
                if (!loggedInUserId) {
                  setButtonText('로그인 후 작성 가능');
                }
              }}
              onMouseOut={() => {
                setButtonText('포스트 작성하기');
              }}
            >
              {loggedInUserId ? (
                <Link href={`/post/editor/${loggedInUserId}`}>
                  {buttonText}
                </Link>
              ) : (
                buttonText
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export { PostList };
