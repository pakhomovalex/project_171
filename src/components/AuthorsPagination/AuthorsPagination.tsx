'use client';

import { useSearchParams } from 'next/navigation';
import { Pagination } from "../Pagination/Pagination";
import { useState } from 'react';

export const AuthorsPagination = ({ totalItems }: { totalItems: number}) => {
  const searchParams = useSearchParams();

  const urlPage = parseInt(searchParams.get('page') || '1', 10);

  const [page, setPage] = useState(isNaN(urlPage) || urlPage < 1 ? 1 : urlPage);

  return (
    <Pagination
      total={totalItems}
      currentPage={page}
      onPageChange={(currentPage: number) => {
        setPage(currentPage);
      }}
    />
  )
};