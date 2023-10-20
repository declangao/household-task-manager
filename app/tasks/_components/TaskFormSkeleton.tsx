import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TaskFormSkeleton() {
  return (
    <div className="max-w-xl flex flex-col gap-3">
      <Skeleton height="3rem" />
      <Skeleton height="23rem" />
    </div>
  );
}
