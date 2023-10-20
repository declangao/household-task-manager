import React from 'react';
import prisma from '@/prisma/client';

import TaskTable from './TaskTable';
import TaskActions from './TaskActions';

export default async function TasksPage() {
  const tasks = await prisma.task.findMany();

  return (
    <div className="flex flex-col gap-3 items-start">
      <TaskActions />

      <TaskTable tasks={tasks} />
    </div>
  );
}

export const dynamic = 'force-dynamic';
