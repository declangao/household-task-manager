import React from 'react';
import prisma from '@/prisma/client';

import TaskTable from './TaskTable';
import TaskActions from './TaskActions';
import { Status, Task } from '@prisma/client';
import Pagination from '@/components/Pagination';

export type TaskQuery = {
  status: Status;
  sort: keyof Task;
  order: 'asc' | 'desc';
  page: string;
};

export default async function TasksPage({
  searchParams,
}: {
  searchParams: TaskQuery;
}) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  const sort: string = ['title', 'createdAt'].includes(searchParams.sort)
    ? searchParams.sort
    : '';
  const order =
    searchParams.order === 'asc' || searchParams.order === 'desc'
      ? searchParams.order
      : undefined;
  const orderBy = { [sort]: order };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const tasks = await prisma.task.findMany({
    where,
    orderBy: sort ? orderBy : { createdAt: 'desc' },
    take: pageSize,
    skip: (page - 1) * pageSize,
  });

  const total = await prisma.task.count({ where });

  return (
    <div className="flex flex-col gap-3 items-start">
      <TaskActions />

      <TaskTable tasks={tasks} searchParams={searchParams} />

      <Pagination total={total} pageSize={pageSize} currentPage={page} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
