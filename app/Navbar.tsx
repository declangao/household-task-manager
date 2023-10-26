'use client';

import React from 'react';
import { BsHouseHeartFill } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Avatar from '@/components/Avatar';

export default function Navbar() {
  return (
    <nav className="border-b mb-4 px-4 py-3">
      <div className="container mx-auto flex justify-between">
        <div className="flex gap-4 items-center">
          <Link href="/">
            <BsHouseHeartFill size="1.5rem" />
          </Link>
          <NavLinks />
        </div>

        <AuthStatus />
      </div>
    </nav>
  );
}

function AuthStatus() {
  const { data: session, status } = useSession();

  const handleLogOut = async () => {
    await signOut();
  };

  if (status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return <Link href="/api/auth/signin">Login</Link>;

  return (
    <div className="dropdown dropdown-end cursor-pointer">
      <label tabIndex={0} className="m-1 cursor-pointer">
        <Avatar name={session?.user?.name!} />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-64 text-center space-y-4"
      >
        <li className="text-lg">Welcome, {session?.user?.name!}!</li>
        {/* <li>
          <Link
            href="/api/auth/signout"
            className="w-full flex justify-center items-center"
          >
            Log Out
          </Link>
        </li> */}
        <li>
          <a
            className="w-full flex justify-center items-center"
            onClick={handleLogOut}
          >
            Log Out
          </a>
        </li>
      </ul>
    </div>
  );
}

function NavLinks() {
  const currPath = usePathname();

  const links: {
    label: string;
    href: string;
  }[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Tasks', href: '/tasks/list' },
  ];

  return (
    <ul className="flex gap-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className={`hover:text-primary transition-colors ${
              currPath === link.href ? '!text-primary' : ''
            }`}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
