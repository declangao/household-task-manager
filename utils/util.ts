import { Status } from '@prisma/client';

export const delay = async (ms: number) => {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
};
