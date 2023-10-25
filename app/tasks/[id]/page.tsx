import React, { cache } from 'react';
import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import prisma from '@/prisma/client';
import TaskDetail from './TaskDetail';
import EditTaskButton from '../_components/EditTaskButton';
import DeleteTaskButton from '../_components/DeleteTaskButton';
import UpdateTaskStatusSelect from '../_components/UpdateTaskStatusSelect';
import AssigneeSelect from '../_components/AssigneeSelect';
import authOptions from '@/app/auth/authOptions';

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

export default async function TaskDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const task = await fetchTask(params.id);
  if (!task) notFound();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      <div className="md:col-span-4">
        <TaskDetail task={task} />
      </div>

      {session && (
        <div className="flex flex-col gap-3 items-center md:items-start">
          <AssigneeSelect task={task} />
          <UpdateTaskStatusSelect task={task} showLabel={true} wide />
          <div className="mt-2" />
          <EditTaskButton id={task.id} />
          <DeleteTaskButton id={task.id} />
        </div>
      )}
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const task = await fetchTask(params.id);

  return {
    title: task?.title,
    description: task?.description || 'Detail of task ' + task?.title,
  };
}
