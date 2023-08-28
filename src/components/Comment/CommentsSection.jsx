import Comment from './Comment';

function CommentsSection({
  comments,
  commentText,
  onCommentChange,
  onCommentSubmit,
}) {
  return (
    <div>
      <h2 className='text-xl font-semibold mt-6 mb-4'>댓글</h2>

      {comments && comments.length ? (
        comments.map((comment) => (
          <Comment key={comment._id} commentInfo={comment} />
        ))
      ) : (
        <p className='text-gray-500 mb-6'>아직 작성된 댓글이 없습니다.</p>
      )}

      <div className='mt-6'>
        <textarea
          value={commentText}
          onChange={onCommentChange}
          placeholder='댓글을 작성하세요.'
          className='w-full p-3 border rounded-md'
        />

        <div className='flex justify-end'>
          <button
            onClick={onCommentSubmit}
            className='ml-2 text-sm text-gray-700 bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded'
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
}

export default CommentsSection;
