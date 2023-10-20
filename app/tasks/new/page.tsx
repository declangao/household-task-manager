import React from 'react';
import dynamic from 'next/dynamic';

const TaskForm = dynamic(() => import('../_components/TaskForm'), {
  ssr: false,
  // loading: () => <TaskFormSkeleton />,
});

export default function NewTaskPage() {
  return <TaskForm />;
}
