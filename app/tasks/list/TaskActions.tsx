'use client';

import React from 'react';
import { Status } from '@prisma/client';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoCreateOutline } from 'react-icons/io5';

const statuses: { label: string; value: Status | '' }[] = [
  { label: 'All', value: '' },
  { label: 'Not Started', value: 'NOT_STARTED' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'On Hold', value: 'ON_HOLD' },
  { label: 'Completed', value: 'COMPLETED' },
];

export default function TaskActions() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;
    const params = new URLSearchParams();

    if (status) params.append('status', status);

    const query = params.size ? '?' + params.toString() : '';
    router.push('/tasks/list' + query);
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div>
        <select
          className="select select-bordered select-sm"
          defaultValue={searchParams.get('status') || undefined}
          onChange={handleStatusChange}
        >
          {statuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="tooltip tooltip-bottom" data-tip="Create a new task">
        <Link href="/tasks/new">
          <button className="btn btn-primary btn-sm normal-case">
            <IoCreateOutline />
            New Task
          </button>
        </Link>
      </div>
    </div>
  );
}
