import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { taskSchema } from '@/app/validationSchemas';

export async function POST(req: NextRequest) {
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
