import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TaskDetailLoadingPage() {
  return (
    <div className="max-w-3xl">
      <Skeleton />

      <div className="flex gap-3 my-2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </div>

      <div className="card prose mt-4 border p-3 max-w-full">
        <Skeleton count={5} />
      </div>
    </div>
  );
}
