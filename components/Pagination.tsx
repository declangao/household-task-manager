'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
} from 'react-icons/bs';

type Props = {
  total: number;
  pageSize: number;
  currentPage: number;
};

export default function Pagination({ total, pageSize, currentPage }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(total / pageSize);

  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push('?' + params.toString());
  };

  return (
    <div className="w-full flex justify-between items-center gap-4">
      <span>
        Page {currentPage} of {pageCount}
      </span>
      <div className="join">
        <button
          className="join-item btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <BsChevronDoubleLeft />
        </button>
        <button
          className="join-item btn btn-sm"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <BsChevronLeft />
        </button>
        <button
          className="join-item btn btn-sm"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <BsChevronRight />
        </button>
        <button
          className="join-item btn btn-sm"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  );
}
