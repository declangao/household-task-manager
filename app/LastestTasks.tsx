import Link from 'next/link';
import React from 'react';

import prisma from '@/prisma/client';
import TaskStatusBadge from '@/components/TaskStatusBadge';
import Avatar from '@/components/Avatar';

export default async function LastestTasks() {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      user: true,
    },
  });

  return (
    <div>
      <h2 className="text-2xl text-center">Latest Tasks</h2>

      <table className="table">
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <Link href={`/tasks/${task.id}`} className="text-primary">
                      {task.title}
                    </Link>
                    <TaskStatusBadge status={task.status} />
                  </div>

                  {task.user?.name && <Avatar name={task.user?.name!} />}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
