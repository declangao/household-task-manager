import { NextRequest, NextResponse } from 'next/server';
import { patchTaskSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const validation = patchTaskSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const task = await prisma.task.findUnique({
    where: { id: params.id },
  });
  if (!task)
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  const updatedTask = await prisma.task.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const task = await prisma.task.findUnique({
    where: { id: params.id },
  });
  if (!task)
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  const deleted = await prisma.task.delete({
    where: { id: params.id },
  });

  return NextResponse.json(deleted);
}
