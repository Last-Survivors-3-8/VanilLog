import Link from 'next/link';
import { postListHref } from '@utils/postListHref';

function Pagination({
  currentPage,
  totalPage,
  blogUserId,
  searchValue,
  limit,
}) {
  const itemsPerPageGroup = 10;
  const startPage =
    Math.floor((currentPage - 1) / itemsPerPageGroup) * itemsPerPageGroup + 1;
  const endPage = Math.min(startPage + itemsPerPageGroup - 1, totalPage);
  const pageNumbers = [];

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-between items-center mt-4'>
      <div className='flex justify-center flex-grow'>
        <Link
          href={`/posts/${postListHref(
            blogUserId,
            searchValue,
            Math.max(1, startPage - itemsPerPageGroup),
            limit,
          )}`}
        >
          <button
            type='button'
            className={`w-10 h-10 m-0.5 text-xl text-white font-bold bg-[#6B99C3] border-2 border-white border-inherit rounded-full hover:bg-[#16354D] hover:text-[#E4E5EA] ${
              startPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={startPage <= 1}
          >
            {'<'}
          </button>
        </Link>

        {pageNumbers.map((number) => (
          <Link
            key={number}
            href={`/posts/${postListHref(
              blogUserId,
              searchValue,
              number,
              limit,
            )}`}
          >
            <button
              type='button'
              className='w-10 h-10 m-0.5 text-xl text-white font-bold bg-[#6B99C3] border-2 border-white border-inherit rounded-full hover:bg-[#16354D] hover:text-[#E4E5EA]'
            >
              {number}
            </button>
          </Link>
        ))}

        <Link
          href={`/posts/${postListHref(
            blogUserId,
            searchValue,
            Math.min(totalPage, endPage + 1),
            limit,
          )}`}
        >
          <button
            type='button'
            className={`w-10 h-10 m-0.5 text-xl text-white font-bold bg-[#6B99C3] border-2 border-white border-inherit rounded-full hover:bg-[#16354D] hover:text-[#E4E5EA] ${
              endPage >= totalPage ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={endPage >= totalPage}
          >
            {'>'}
          </button>
        </Link>
      </div>
    </div>
  );
}

export { Pagination };
