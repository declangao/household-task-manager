import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import TaskActions from './TaskActions';

export default function TasksLoadingPage() {
  const tasks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col gap-3">
      <TaskActions />

      <table className="table border">
        <thead>
          <tr>
            <th>Task</th>
            <th className="hidden md:table-cell">Status</th>
            <th className="hidden md:table-cell">Created</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task}>
              <td>
                <Skeleton />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </td>
              <td className="hidden md:table-cell">
                <Skeleton />
              </td>
              <td className="hidden md:table-cell">
                <Skeleton />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
