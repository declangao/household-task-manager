import React from 'react';

export default function Avatar({ name }: { name: string }) {
  name = name.trim();

  const getInitials = () => {
    let initials;
    if (name.includes(' ')) {
      const arr = name.split(' ');
      initials = arr[0][0] + arr[arr.length - 1][0];
    } else {
      initials = name[0];
    }

    return initials;
  };

  return (
    <div className="mask mask-circle bg-primary h-8 w-8 inline-flex justify-center items-center">
      <div className="text-lg">{getInitials()}</div>
    </div>
  );
}
