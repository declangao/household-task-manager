import Link from 'next/link';
import React from 'react';

type Props = {
  notStarted: number;
  inProgress: number;
  onHold: number;
  completed: number;
};

export default function TaskStatistics({
  notStarted,
  inProgress,
  onHold,
  completed,
}: Props) {
  const statistics: {
    label: string;
    value: number;
    backrgound: string;
    query: string;
  }[] = [
    {
      label: 'Not Started Tasks',
      value: notStarted,
      backrgound: 'bg-primary',
      query: '?status=NOT_STARTED',
    },
    {
      label: 'In Progress Tasks',
      value: inProgress,
      backrgound: 'bg-accent',
      query: '?status=IN_PROGRESS',
    },
    {
      label: 'On Hold Tasks',
      value: onHold,
      backrgound: 'bg-secondary',
      query: '?status=ON_HOLD',
    },
    {
      label: 'Completed Tasks',
      value: completed,
      backrgound: 'bg-neutral',
      query: '?status=COMPLETED',
    },
  ];

  return (
    <div className="flex justify-center flex-wrap md:flex-nowrap gap-4">
      {statistics.map((stat) => (
        <Link
          key={stat.label}
          href={`/tasks/list${stat.query}`}
          className="w-full"
        >
          <div
            className={`card shadow-md ${stat.backrgound} bg-opacity-50 flex-grow-1 flex-shrink-1 hover:shadow-xl`}
          >
            <div className="card-body items-center p-4">
              <h2 className="card-title">{stat.label}</h2>
              <span className="text-5xl font-bold">{stat.value}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
