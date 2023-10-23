import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import Editor from '@src/components/Editor';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import EditorJS from '@editorjs/editorjs';

describe('<Editor />', () => {
  it('Editor 컴포넌트 렌더링 후 포스트가 올바르게 저장되어야 한다.', async () => {
    useRouter.mockReturnValue({
      push: jest.fn(),
    });

    axios.post.mockResolvedValue({
      data: {
        status: 'success',
      },
    });

    const mockEditorJSInstance = {
      isReady: Promise.resolve(),
      render: jest.fn(),
      save: jest.fn().mockResolvedValue({
        blocks: [{ type: 'paragraph', data: { text: 'testDataContent' } }],
      }),
    };

    EditorJS.mockImplementation(() => mockEditorJSInstance);

    await act(async () => {
      render(
        <Editor
          author='testAuthorId'
          postId='testPostId'
          title='testTitle'
          content={{}}
          error={null}
          setError={jest.fn()}
          isModify={false}
        />,
      );
    });

    const saveButton = screen.getByText('저장하기');

    await act(async () => {
      fireEvent.click(saveButton);
    });

    expect(mockEditorJSInstance.save).toHaveBeenCalled();
    expect(axios.post).toHaveBeenCalled();
  });
});