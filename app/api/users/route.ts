import prisma from '@/prisma/client';
import { hashPassword } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
  username: z.string().min(3, '').max(20, ''),
  password: z.string().min(6, '').max(30, ''),
  name: z.string().min(1, '').max(30, '').optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validation = registerSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const existingUser = await prisma.user.findUnique({
    where: { username: body.username },
  });
  if (existingUser)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashedPassword = await hashPassword(body.password);
  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      hashedPassword,
      name: body.name || body.username,
    },
  });
  newUser.hashedPassword = null; // For security reason
  return NextResponse.json(newUser);
}

export async function GET(req: NextRequest) {
  const users = await prisma.user.findMany({
    orderBy: { name: 'asc' },
  });

  return NextResponse.json(
    users.map((u) => {
      u.hashedPassword = null;
      return u;
    })
  );
}
