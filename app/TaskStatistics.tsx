'use client';

import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      className="flex justify-center flex-wrap md:flex-nowrap gap-4"
      variants={{
        hidden: {
          scale: 0,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {statistics.map((stat) => (
        <motion.div
          key={stat.label}
          className="w-full"
          variants={{
            hidden: {
              y: -100,
              opacity: 0,
            },
            visible: {
              y: 0,
              opacity: 1,
            },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href={`/tasks/list${stat.query}`}>
            <div
              className={`card shadow-md ${stat.backrgound} bg-opacity-50 flex-grow-1 flex-shrink-1 hover:shadow-xl`}
            >
              <div className="card-body items-center p-4">
                <h2 className="card-title">{stat.label}</h2>
                <span className="text-5xl font-bold">{stat.value}</span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
