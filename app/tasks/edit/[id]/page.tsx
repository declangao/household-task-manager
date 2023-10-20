import React from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import prisma from '@/prisma/client';
import DeleteTaskButton from '../../_components/DeleteTaskButton';
import UpdateTaskStatusSelect from '../../_components/UpdateTaskStatusSelect';

const TaskForm = dynamic(() => import('../../_components/TaskForm'), {
  ssr: false,
});

export default async function TaskEditPage({
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
        <TaskForm task={task} />
      </div>

      <div className="flex flex-col gap-3">
        <DeleteTaskButton id={task.id} />
        <UpdateTaskStatusSelect task={task} />
      </div>
    </div>
  );
}
