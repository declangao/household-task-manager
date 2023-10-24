import { Status } from '@prisma/client';
import React from 'react';

export const statusMap: Record<
  Status,
  {
    label: string;
    color: // 'badge-info' | 'badge-success' | 'badge-warning' | 'badge-error';
    'badge-neutral' | 'badge-primary' | 'badge-secondary' | 'badge-accent';
  }
> = {
  NOT_STARTED: { label: 'Not Started', color: 'badge-primary' },
  IN_PROGRESS: { label: 'In Progress', color: 'badge-accent' },
  ON_HOLD: { label: 'On Hold', color: 'badge-secondary' },
  COMPLETED: { label: 'Completed', color: 'badge-neutral' },
};

export default function TaskStatusBadge({ status }: { status: Status }) {
  return (
    <span className={`badge badge-sm ${statusMap[status].color}`}>
      {statusMap[status].label}
    </span>
  );
}
