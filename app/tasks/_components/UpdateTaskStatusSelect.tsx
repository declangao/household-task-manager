'use client';

import React, { useState } from 'react';
import { Status, Task } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function UpdateTaskStatusSelect({ task }: { task: Task }) {
  const statuses: { label: string; value: Status }[] = [
    { label: 'Not Started', value: 'NOT_STARTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'On Hold', value: 'ON_HOLD' },
    { label: 'Completed', value: 'COMPLETED' },
  ];

  const statusColorMap: Record<
    Status,
    'select-primary' | 'select-secondary' | 'select-accent' | 'select-bordered'
  > = {
    NOT_STARTED: 'select-primary',
    IN_PROGRESS: 'select-accent',
    ON_HOLD: 'select-secondary',
    COMPLETED: 'select-bordered',
  }; // Have to include 'select-' to avoid tree shaking?

  const [status, setStatus] = useState(task.status);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsPending(true);
    setStatus(e.target.value as Status);

    try {
      await axios.patch('/api/tasks/' + task.id, { status: e.target.value });
      router.push('/tasks/list');
      router.refresh();
    } catch (err) {
      toast.error('Failed to update status.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <select
        className={`select ${statusColorMap[status]} btn-wide`}
        defaultValue={task.status}
        disabled={isPending}
        onChange={handleStatusChange}
      >
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <Toaster />
    </>
  );
}
