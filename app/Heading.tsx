'use client';

import React from 'react';
import { Cursor, Typewriter } from 'react-simple-typewriter';

export default function Heading() {
  const words = ['Track Household Chores.', 'Micromanage Your Spouse.'];

  return (
    <div className="mb-8">
      <h1 className="text-center text-2xl font-bold">
        A Simple Tool to{' '}
        <span className="text-primary">
          <Typewriter words={words} loop={0} delaySpeed={2000} />
          <Cursor cursorColor="hsl(var(--s))" />
        </span>
      </h1>
    </div>
  );
}
