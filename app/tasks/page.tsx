import Link from 'next/link';
import React from 'react';

export default function TasksPage() {
  return (
    <>
      <Link href="/tasks/new">
        <button className="btn btn-primary">New Task</button>
      </Link>
    </>
  );
}
