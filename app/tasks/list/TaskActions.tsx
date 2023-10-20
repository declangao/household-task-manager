import Link from 'next/link';
import React from 'react';

export default function TaskActions() {
  return (
    <Link href="/tasks/new">
      <button className="btn btn-primary normal-case">New Task</button>
    </Link>
  );
}
