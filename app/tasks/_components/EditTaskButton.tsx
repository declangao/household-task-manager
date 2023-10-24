import React from 'react';
import Link from 'next/link';
import { BiEditAlt } from 'react-icons/bi';

export default function EditTaskButton({ id }: { id: string }) {
  return (
    <Link href={`/tasks/edit/${id}`}>
      <button className="btn btn-sm btn-primary btn-wide">
        <BiEditAlt />
        Edit Task
      </button>
    </Link>
  );
}
