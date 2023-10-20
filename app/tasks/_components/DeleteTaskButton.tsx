'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { MdOutlineDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function DeleteTaskButton({ id }: { id: string }) {
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    setIsPending(true);

    try {
      await axios.delete('/api/tasks/' + id);
      router.push('/tasks/list');
      router.refresh();
    } catch (err) {
      setIsPending(false);
      toast.error('Something went wrong. The task could not be deleted.');
    }
  };

  return (
    <>
      <button
        className="btn btn-error btn-wide"
        disabled={isPending}
        onClick={() => {
          (
            document.getElementById('modalDelete') as HTMLDialogElement
          ).showModal();
        }}
      >
        <MdOutlineDelete />
        Delete Task
      </button>

      <dialog id="modalDelete" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Warning</h3>
          <p className="py-4">
            This operation cannot be undone. Are you sure you want to delete
            this task?
          </p>
          <div className="modal-action">
            <form method="dialog" className="space-x-3">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">No</button>
              <button className="btn btn-primary" onClick={handleDelete}>
                Yes
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <Toaster />
    </>
  );
}
