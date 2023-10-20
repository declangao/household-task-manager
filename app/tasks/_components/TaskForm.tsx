'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Task } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';
import toast, { Toaster } from 'react-hot-toast';

import { taskSchema } from '@/app/validationSchemas';
import { delay } from '@/utils/util';

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm({ task }: { task?: Task }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const onSubmit: SubmitHandler<TaskFormData> = async (data) => {
    setIsPending(true);
    await delay(2000);

    try {
      await axios.post('/api/tasks', data);
      router.push('/tasks/list');
      router.refresh();
    } catch (err) {
      setIsPending(false);
      toast.error('An unexpected error occurred...');
    }
  };

  return (
    <div>
      <form
        className="flex flex-col gap-3 max-w-xl items-start"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Title"
          defaultValue={task?.title}
          className="input input-bordered w-full"
          {...register('title')}
        />
        {errors.title?.message && (
          <p className="text-error">{errors.title?.message}</p>
        )}

        <Controller
          name="description"
          control={control}
          defaultValue={task?.description || undefined}
          render={({ field }) => (
            <SimpleMDE
              className="w-full prose"
              placeholder="Description"
              {...field}
            />
          )}
        />
        {errors.description?.message && (
          <p className="text-error">{errors.description?.message}</p>
        )}

        <button className="btn btn-primary normal-case" disabled={isPending}>
          {isPending ? (
            <>
              {task ? 'Saving' : 'Submitting'}{' '}
              <span className="loading loading-spinner" />
            </>
          ) : task ? (
            'Save Task'
          ) : (
            'Submit New Task'
          )}
        </button>
      </form>

      <Toaster />
    </div>
  );
}
