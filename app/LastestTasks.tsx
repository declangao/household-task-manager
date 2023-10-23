import Avatar from '@/components/Avatar';
import TaskStatusBadge from '@/components/TaskStatusBadge';
import prisma from '@/prisma/client';
import Link from 'next/link';
import React from 'react';

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
                <Link href={`/tasks/${task.id}`} className="text-primary">
                  {task.title}
                </Link>
              </td>
              <td>
                <TaskStatusBadge status={task.status} />
              </td>
              <td>{task.user?.name && <Avatar name={task.user?.name!} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
