'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ERRORS } from 'constants/errors';

const Editor = dynamic(() => import('@src/components/Editor'), {
  ssr: false,
});

function PostEditPage({ params }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState({});
  const [error, setError] = useState(null);

  const userId = Array.isArray(params) ? params[0] : params.userId;
  const postId = params[1] || null;

  const isModify = Boolean(postId);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const setSaveError = (error) => {
    setError(error);
  };

  useEffect(() => {
    if (isModify) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/v1/post/${postId}`);

          if (response.data.status === 200) {
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
          }

          if (response.data.status !== 200) {
            setError(response.data.message);
          }
        } catch (e) {
          setError(ERRORS.POST_LOADING_ERROR);
        }
      };

      fetchData();
    }
  }, [isModify, postId]);

  return (
    <>
      <div className='flex justify-center'>
        <div className='w-[800px] text-center mt-6'>
          <div className='flex items-center justify-center border-2 border-black'>
            <input
              type='text'
              placeholder='제목을 입력하세요'
              className='w-4/5 p-2 text-lg'
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <Editor
            author={userId}
            postId={postId}
            title={title}
            content={content}
            isModify={isModify}
            error={error}
            setError={setSaveError}
          />
        </div>
      </div>
    </>
  );
}

export default PostEditPage;
