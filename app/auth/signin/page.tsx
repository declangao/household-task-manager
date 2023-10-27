'use client';

import { signIn } from 'next-auth/react';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error: string };
}) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    signIn('credentials', {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-100px)]">
      <div className="card p-4 md:p-12 flex bg-base-200/70 flex-col justify-center items-center gap-4">
        {searchParams.error === 'CredentialsSignin' && (
          <p className="text-error">Username or password incorrect...</p>
        )}

        <form className="flex flex-col gap-3">
          <motion.input
            type="text"
            placeholder="Username"
            ref={usernameRef}
            className="input input-bordered w-full"
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            ref={passwordRef}
            className="input input-bordered w-full"
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          />

          <motion.button
            className="btn btn-primary normal-case"
            onClick={handleSubmit}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Login
          </motion.button>
        </form>

        <div className="text-base-content/70">
          <p>Username: demo</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}
