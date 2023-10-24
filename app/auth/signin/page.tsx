'use client';

import React from 'react';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
      <form className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
        />

        <button
          className="btn btn-primary normal-case"
          // disabled={isPending}
        >
          Login
        </button>
      </form>
    </div>
  );
}
