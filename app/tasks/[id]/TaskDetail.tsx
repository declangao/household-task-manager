import React from 'react';
import { Task } from '@prisma/client';
import Markdown from 'react-markdown';

import TaskStatusBadge from '@/components/TaskStatusBadge';

export default function TaskDetail({ task }: { task: Task }) {
  return (
    <>
      <h1 className="text-2xl">{task.title}</h1>

      <div className="flex gap-3 my-2 items-center">
        <TaskStatusBadge status={task.status} />
        <span>{task.createdAt.toLocaleDateString()}</span>
      </div>

      <div className="card border p-4 mt-4 prose max-w-full">
        {task.description && <Markdown>{task.description}</Markdown>}
        {!task.description && (
          <h3 className="text-lg text-base-content/40">Description is empty</h3>
        )}
      </div>
    </>
  );
}
