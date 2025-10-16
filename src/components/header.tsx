"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Logo from '../../public/logo.png';

interface Props {
  className?: string;
}

interface User {
  name: string
  direction: string
  group: string
  id: string
  role: string
  subgroup: string
}

const API_URL = "http://localhost:4000";

export const Header: React.FC<Props> = ({ }) => {
  const [infoUser, setInfoUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('currentUserId') : null;
    const id = stored || "1";
    fetch(`${API_URL}/users/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(u => setInfoUser(u))
      .catch(() => { });
  }, []);
  console.log(infoUser);

  return (
    <header className='w-full h-auto flex flex-col items-start gap-y-[15px] px-[10px] py-[16px]'>
      <div className='flex flex-row items-center w-full gap-x-[10px] py-[11px]'>
        <Image src={Logo} alt="logo" className='w-[64px] h-[64px] rounded-[50%]' width={64} height={64} />
        <div className='flex flex-col items-start'>
          <span className='font-[400] text-[18px] font-[Unbounded] text-[var(--black)]'>{infoUser?.name}</span>
          <span className='font-[400] text-[14px] font-[Unbounded] text-[var(--color3)]'>{infoUser?.group} | {infoUser?.subgroup} группа</span>
        </div>
      </div>
      <div className='w-full h-[4px] rounded-[9px] bg-[var(--color3)]'></div>
    </header>
  );
};