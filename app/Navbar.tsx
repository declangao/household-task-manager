'use client';

import React from 'react';
import { BsHouseHeartFill } from 'react-icons/bs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        <div></div>
      </div>
    </nav>
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
    <ul className="flex gap-4">
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
