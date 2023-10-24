import React, { useState } from 'react';
import { Task } from '@prisma/client';
import Link from 'next/link';
import { GoSortAsc, GoSortDesc } from 'react-icons/go';

import TaskStatusBadge from '@/components/TaskStatusBadge';
import UpdateTaskStatusSelect from '../_components/UpdateTaskStatusSelect';
import { TaskQuery } from './page';
import Avatar from '@/components/Avatar';

type Props = {
  tasks: Task[];
  searchParams: TaskQuery;
};

export default function TaskTable({ tasks, searchParams }: Props) {
  const getSortParams = (sort: string) => {
    if (!searchParams.order) return { sort, order: 'asc' };
    if (searchParams.order === 'asc') return { sort, order: 'desc' };
    if (searchParams.order === 'desc') return { sort: '', order: '' };
  };

  return (
    <table className="table border">
      <thead>
        <tr>
          <th>
            <Link
              href={{
                query: {
                  ...searchParams,
                  ...getSortParams('title'),
                },
              }}
              className="inline-flex items-center"
            >
              Task
              {searchParams.sort === 'title' &&
                searchParams.order === 'asc' && (
                  <GoSortAsc className="inline ml-1" />
                )}
              {searchParams.sort === 'title' &&
                searchParams.order === 'desc' && (
                  <GoSortDesc className="inline ml-1" />
                )}
            </Link>
          </th>
          {/* <th className="hidden md:table-cell">Assignee</th> */}
          <th className="hidden md:table-cell">Status</th>
          <th className="hidden md:table-cell">
            <Link
              href={{
                query: {
                  ...searchParams,
                  ...getSortParams('createdAt'),
                },
              }}
              className="inline-flex items-center"
            >
              Created
              {searchParams.sort === 'createdAt' &&
                searchParams.order === 'asc' && (
                  <GoSortAsc className="inline ml-1" />
                )}
              {searchParams.sort === 'createdAt' &&
                searchParams.order === 'desc' && (
                  <GoSortDesc className="inline ml-1" />
                )}
            </Link>
          </th>
          <th className="hidden md:table-cell">Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>
              <Link href={`/tasks/${task.id}`} className="text-primary">
                {task.title}
              </Link>
              <div className="block md:hidden">
                <TaskStatusBadge status={task.status} />
              </div>
            </td>
            {/* <td className="hidden md:table-cell">
              <Avatar name="" />
            </td> */}
            <td className="hidden md:table-cell">
              <TaskStatusBadge status={task.status} />
            </td>
            <td className="hidden md:table-cell">
              {task.createdAt.toDateString()}
            </td>
            <td className="hidden md:table-cell">
              <UpdateTaskStatusSelect task={task} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
