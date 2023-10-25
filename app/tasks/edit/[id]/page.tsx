import React, { cache } from 'react';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import prisma from '@/prisma/client';
import DeleteTaskButton from '../../_components/DeleteTaskButton';
import UpdateTaskStatusSelect from '../../_components/UpdateTaskStatusSelect';
import AssigneeSelect from '../../_components/AssigneeSelect';

const TaskForm = dynamic(() => import('../../_components/TaskForm'), {
  ssr: false,
});

const fetchTask = cache((taskId: string) => {
  return prisma.task.findUnique({
    where: { id: taskId },
  });
});

type Props = {
  params: {
    id: string;
  };
};

export default async function TaskEditPage({ params }: Props) {
  const task = await fetchTask(params.id);
  if (!task) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div className="md:col-span-4">
        <TaskForm task={task} />
      </div>

      <div className="flex flex-col gap-3">
        <AssigneeSelect task={task} />
        <UpdateTaskStatusSelect task={task} showLabel wide />
        <div className="mt-2" />
        <DeleteTaskButton id={task.id} />
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const task = await fetchTask(params.id);

  return {
    title: task?.title + ' | Edit',
  };
}
