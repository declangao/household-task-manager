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
  }[] = [
    { label: 'Not Started Tasks', value: notStarted, backrgound: 'bg-primary' },
    { label: 'In Progress Tasks', value: inProgress, backrgound: 'bg-accent' },
    { label: 'On Hold Tasks', value: onHold, backrgound: 'bg-secondary' },
    { label: 'Completed Tasks', value: completed, backrgound: 'bg-neutral' },
  ];

  return (
    <div className="flex justify-center flex-wrap md:flex-nowrap gap-4">
      {statistics.map((stat) => (
        <div
          key={stat.label}
          className={`card w-96 bg-base-100 shadow-md ${stat.backrgound} bg-opacity-30 flex-grow-1 flex-shrink-1`}
        >
          <div className="card-body items-center p-4">
            <h2 className="card-title">{stat.label}</h2>
            <span className="text-5xl font-bold">{stat.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
