import prisma from '@/prisma/client';
import TaskStatistics from './TaskStatistics';
import TaskChart from './TaskChart';
import LastestTasks from './LastestTasks';

export default async function HomePage() {
  const tasks = await prisma.task.findMany();
  const statistics: {
    total?: number;
    notStarted: number;
    inProgress: number;
    onHold: number;
    completed: number;
  } = {
    total: tasks.length,
    notStarted: tasks.filter((t) => t.status === 'NOT_STARTED').length,
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
    onHold: tasks.filter((t) => t.status === 'ON_HOLD').length,
    completed: tasks.filter((t) => t.status === 'COMPLETED').length,
  };

  return (
    <>
      <TaskStatistics
        notStarted={statistics.notStarted}
        inProgress={statistics.inProgress}
        onHold={statistics.onHold}
        completed={statistics.completed}
      />
      <div className="md:grid grid-cols-8 gap-4 items-center mt-12">
        <div className="md:col-span-5">
          <TaskChart
            notStarted={statistics.notStarted}
            inProgress={statistics.inProgress}
            onHold={statistics.onHold}
            completed={statistics.completed}
          />
        </div>
        <div className="col-span-3">
          <LastestTasks />
        </div>
      </div>
    </>
  );
}
