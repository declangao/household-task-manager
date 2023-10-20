import React from 'react';
import { Task } from '@prisma/client';
import Link from 'next/link';

import TaskStatusBadge from '@/components/TaskStatusBadge';
import UpdateTaskStatusSelect from '../_components/UpdateTaskStatusSelect';

type Props = {
  tasks: Task[];
};

export default function TaskTable({ tasks }: Props) {
  return (
    <table className="table border">
      <thead>
        <tr>
          <th>Task</th>
          <th className="hidden md:table-cell">Status</th>
          <th className="hidden md:table-cell">Created</th>
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
