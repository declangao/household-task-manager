import React from 'react';
import { notFound } from 'next/navigation';

import prisma from '@/prisma/client';
import TaskDetail from './TaskDetail';
import EditTaskButton from '../_components/EditTaskButton';
import DeleteTaskButton from '../_components/DeleteTaskButton';
import UpdateTaskStatusSelect from '../_components/UpdateTaskStatusSelect';
import AssigneeSelect from '../_components/AssigneeSelect';

export default async function TaskDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const task = await prisma.task.findUnique({
    where: { id: params.id },
  });
  if (!task) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div className="md:col-span-4">
        <TaskDetail task={task} />
      </div>

      <div className="flex flex-col gap-3 items-center md:items-start">
        <AssigneeSelect task={task} />
        <UpdateTaskStatusSelect task={task} showLabel={true} />
        <div className="mt-4" />
        <EditTaskButton id={task.id} />
        <DeleteTaskButton id={task.id} />
      </div>
    </div>
  );
}
