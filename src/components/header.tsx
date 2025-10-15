import Image from 'next/image';
import React from 'react';
import Logo from '../../public/logo.png';

interface Props {
className?: string;
}

export const Header: React.FC<Props> = ({  }) => {
  return (
    <header className='w-full h-auto flex flex-col items-start gap-y-[15px] px-[30px] py-[16px]'>
        <div className='flex flex-row items-center w-full gap-x-[10px] py-[11px]'>
            <Image src={Logo} alt="logo" className='w-[64px] h-[64px] rounded-[50%]' width={64} height={64}/>
            <div className='flex flex-col items-start'>
                <span className='font-[400] text-[18px] font-[Unbounded] text-[var(--black)]'>Халитов Аяз</span>
                <span className='font-[400] text-[14px] font-[Unbounded] text-[var(--color3)]'>09-564 | 1 группа</span>
            </div>
        </div>
        <div className='w-full h-[4px] rounded-[9px] bg-[var(--color3)]'></div>
    </header>
  );
};