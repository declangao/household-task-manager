'use client';

import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

type Props = {
  notStarted: number;
  inProgress: number;
  onHold: number;
  completed: number;
};

export default function TaskChart({
  notStarted,
  inProgress,
  onHold,
  completed,
}: Props) {
  const data = [
    { label: 'No Started', value: notStarted },
    { label: 'In Progress', value: inProgress },
    { label: 'On Hold', value: onHold },
    { label: 'Completed', value: completed },
  ];

  return (
    <ResponsiveContainer width="90%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="label" interval="preserveStart" />
        <YAxis allowDecimals={false} />
        <Tooltip wrapperClassName="text-primary" />
        <Bar dataKey="value" className="fill-primary/70" />
      </BarChart>
    </ResponsiveContainer>
  );
}
