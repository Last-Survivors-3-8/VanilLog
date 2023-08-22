import createDOMPurify from 'dompurify';
import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

import Post from '@models/Post';
import dbConnect from '@lib/dbConnect';
import { ERRORS } from '@utils/errors';
import { sendErrorResponse } from '@utils/response';
import { validateObjectId } from '@utils/validateObjectId';
import { findById } from '@utils/findById';
import { getLastPartOfUrl } from '@utils/getLastPartOfUrl';
import { getSessionFromRequest } from '@utils/getSessionFromRequest';
import { verifyPostAuthor } from '@utils/verifyPostAuthor';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

/**
 * 블로그 포스트 조회 API
 * @URL /api/v1/post/:postId
 * @param request
 */
async function GET(request) {
  await dbConnect();

  try {
    const postId = getLastPartOfUrl(request.url);
    validateObjectId(postId);

    const post = await findById(Post, postId, ERRORS.POST_NOT_FOUND);

    return NextResponse.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

/**
 * 블로그 포스트 삭제 API
 * @URL /api/v1/post/:postId
 * @param request
 */
async function DELETE(request) {
  await dbConnect();

  try {
    const postId = getLastPartOfUrl(request.url);
    validateObjectId(postId);

    const session = await getSessionFromRequest(request);
    if (!session) {
      throw new Error(ERRORS.USER_NOT_LOGGED_IN.MESSAGE);
    }

    const post = await findById(Post, postId, ERRORS.POST_NOT_FOUND);
    verifyPostAuthor(post, session);

    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
      throw new Error(ERRORS.POST_NOT_FOUND.MESSAGE);
    }

    return NextResponse.json({
      status: 'success',
      data: {
        message: '포스트가 성공적으로 삭제되었습니다',
        post: deletedPost,
      },
    });
  } catch (error) {
    return sendErrorResponse(error);
  }
}

/**
 * 블로그 포스트 수정 API
 * @URL /api/v1/post/:postId
 * @param request
 */
async function PUT(request) {
  await dbConnect();

  try {
    const postId = getLastPartOfUrl(request.url);
    validateObjectId(postId);

    const session = await getSessionFromRequest(request);
    if (!session) {
      throw new Error(ERRORS.USER_NOT_LOGGED_IN.MESSAGE);
    }
    const post = await findById(Post, postId, ERRORS.POST_NOT_FOUND);
    verifyPostAuthor(post, session);

    const parsedData = JSON.parse(await request.text());

    let { title, content } = parsedData;
    title = DOMPurify.sanitize(title);
    if (!content || !content.blocks || !Array.isArray(content.blocks)) {
      throw new Error(ERRORS.MISSING_POST_FIELDS.MESSAGE);
    }

    content.blocks = content.blocks.map((block) => {
      if (block.type === 'paragraph') {
        block.data.text = DOMPurify.sanitize(block.data.text);
      } else if (block.type === 'image') {
        block.data.caption = DOMPurify.sanitize(block.data.caption);
      }
      return block;
    });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true },
    );

    if (!updatedPost) {
      throw new Error(ERRORS.POST_NOT_FOUND.MESSAGE);
    }

    return NextResponse.json({
      status: 'success',
      data: {
        message: '포스트가 성공적으로 업데이트되었습니다',
        post: updatedPost,
      },
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return sendErrorResponse(ERRORS.INVALID_JSON.MESSAGE);
    }
    return sendErrorResponse(error);
  }
}

export { GET, DELETE, PUT };