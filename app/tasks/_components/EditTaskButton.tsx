import React from 'react';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';

export default function EditTaskButton({ id }: { id: string }) {
  return (
    <Link href={`/tasks/edit/${id}`}>
      <button className="btn btn-primary btn-wide">
        <BiEdit />
        Edit Task
      </button>
    </Link>
  );
}
