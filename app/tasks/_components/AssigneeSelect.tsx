'use client';

import { Task, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function AssigneeSelect({ task }: { task: Task }) {
  const [isPending, setIsPending] = useState(false);

  const handleAssigneeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsPending(true);

    try {
      await axios.patch('/api/tasks/' + task.id, {
        userId: e.target.value || undefined,
      });
      console.log(task.id, task.userId, e.target.value);
    } catch (err) {
      toast.error('Failed to assign user.');
    } finally {
      setIsPending(false);
    }
  };

  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios.get('/api/users').then((res) => res.data),
  });

  if (isLoading) return <Skeleton height="3rem" className="!btn-wide" />;

  if (error) return null;

  return (
    <>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Select Assignee:</span>
        </label>
        <select
          className="select select-sm select-bordered btn-wide"
          defaultValue={task.userId || ''}
          disabled={isPending}
          onChange={handleAssigneeChange}
        >
          <option value={''}>Unassigned</option>
          {users!.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <Toaster />
    </>
  );
}
