import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import prisma from '@/prisma/client';
import { taskSchema } from '@/app/validationSchemas';
import authOptions from '@/app/auth/authOptions';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();

  const validation = taskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.format() },
      { status: 400 }
    );

  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newTask, { status: 201 });
}
