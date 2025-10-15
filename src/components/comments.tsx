"use client";

import React from "react";

interface Props {
  className?: string;
}

export const Comments: React.FC<Props> = ({ className }) => {
    const [open, isOpen] = React.useState(false);

    const toggle = () => {
        isOpen(!open);
    }

  return (
    <>
      <div onClick={toggle} className="cursor-pointer w-fit gap-x-[5px] px-[10px] flex flex-row h-[40px] rounded-[12px] bg-[var(--color1)] items-center justify-center">
        <svg
          className="w-[24px] h-[24px]"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 20.5C16.4183 20.5 20 16.9183 20 12.5C20 8.08172 16.4183 4.5 12 4.5C7.58172 4.5 4 8.08172 4 12.5C4 13.7797 4.30049 14.9893 4.83477 16.062C4.97675 16.347 5.02401 16.6729 4.94169 16.9805L4.46521 18.7613C4.25836 19.5344 4.96561 20.2416 5.73868 20.0348L7.51951 19.5583C7.82715 19.476 8.15297 19.5233 8.43802 19.6652C9.51069 20.1995 10.7203 20.5 12 20.5Z"
            stroke="white"
            stroke-width="1.5"
          />
          <path
            opacity="0.5"
            d="M8.8 11.3H15.2"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            opacity="0.5"
            d="M8.8 14.1H13.2"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        <span className="font-[Unbounded] font-[300] text-[12px] text-[var(--white)]">
          12 комментов
        </span>
      </div>
      {(open && (
        <div className="top-0 left-0 absolute w-full h-full bg-[#F3F3F3] flex flex-col py-[15px] px-[30px] gap-y-[30px]">
            <div className='w-full items-center flex flex-row gap-x-[10px]'>
            <svg className='w-[32px] h-[32px]' viewBox="0 0 32 32" fill='none' xmlns="http://www.w3.org/2000/svg">
<path d="M16 29.3333C23.3638 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63616 23.3638 2.66663 16 2.66663C8.63622 2.66663 2.66669 8.63616 2.66669 16C2.66669 23.3638 8.63622 29.3333 16 29.3333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 18.6667C17.4727 18.6667 18.6666 17.4728 18.6666 16C18.6666 14.5273 17.4727 13.3334 16 13.3334C14.5272 13.3334 13.3333 14.5273 13.3333 16C13.3333 17.4728 14.5272 18.6667 16 18.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span className='font-[700] text-[18px] font-[Montserrat] text-[var(--black)]'>Комментарии</span>
<svg onClick={toggle} className='ml-auto w-[24px] h-[24px]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
<path d="M4.31083 0L0 4.31083L2.20127 6.5121L7.64331 12.0459L2.20127 17.4879L0 19.5975L4.31083 24L6.5121 21.7987L12.0459 16.265L17.4879 21.7987L19.5975 24L24 19.5975L21.7987 17.4879L16.265 12.0459L21.7987 6.5121L24 4.31083L19.5975 0L17.4879 2.20127L12.0459 7.64331L6.5121 2.20127L4.31083 0Z" fill="black"/>
</svg>
        </div>
        <div className="scroll-container">
        <div className='bg-white w-full flex flex-col gap-y-[4px] px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Халитов Аяз</span>
            <p className='font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'>Прорешать 15 примеров страница 15, плюс подготовиться к контрольной работе по теме матрица</p>
        </div>
        <div className='bg-white w-full flex flex-col gap-y-[4px] px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Халитов Аяз</span>
            <p className='font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'>Прорешать 15 примеров страница 15, плюс подготовиться к контрольной работе по теме матрица</p>
        </div>
        <div className='bg-white w-full flex flex-col gap-y-[4px] px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Халитов Аяз</span>
            <p className='font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'>Прорешать 15 примеров страница 15, плюс подготовиться к контрольной работе по теме матрица</p>
        </div>
        <div className='bg-white w-full flex flex-col gap-y-[4px] px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Халитов Аяз</span>
            <p className='font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'>Прорешать 15 примеров страница 15, плюс подготовиться к контрольной работе по теме матрица</p>
        </div>
        <div className='bg-white w-full flex flex-col gap-y-[4px] px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Халитов Аяз</span>
            <p className='font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'>Прорешать 15 примеров страница 15, плюс подготовиться к контрольной работе по теме матрица</p>
        </div>
        <div className='bg-white w-full flex flex-col gap-y-[4px] px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Халитов Аяз</span>
            <p className='font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'>Прорешать 15 примеров страница 15, плюс подготовиться к контрольной работе по теме матрица</p>
        </div>
        </div>
        <div className='relative bg-white mb-[20px] w-full flex flex-col px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Комментарий</span>
            <textarea placeholder='Написать комментарий...' className='outline-none placeholder:font-[400] placeholder:text-[18px] placeholder:font-[Montserrat] placeholder:text-[var(--black)] font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'></textarea>
            <svg className='ml-auto w-[30px] h-[30px]' viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8354 9.20691L25.7195 20.7931L14.8354 32.3793" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
        </div>
      ))}
    </>
  );
};
