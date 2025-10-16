"use client";

import React from 'react';

interface Props {
  className?: string;
}

export const Subject: React.FC<Props> = ({ className }) => {
  const [isOn, setIsOn] = React.useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  const [isOpen, setIsOpen] = React.useState(false);

  const show = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div onClick={show} className="cursor-pointer rounded-[10px] w-full p-[15px] flex flex-row items-start gap-x-[20px] border-[1px] border-[#000]">
        <div className='flex flex-col items-start gap-y-[10px]'>
          <h5 className='font-[700] text-[16px] font-[Montserrat] text-[var(--black)]'>Линейная алгебра</h5>
          <span className='font-[500] text-[10px] font-[Montserrat] text-[var(--color10)]'>
            08:30 - 10:00
            <span className='text-[var(--color3)]'> | </span>
            кабинет 1014
          </span>
        </div>
        <div className='w-[89px] h-[23px] rounded-[14px] bg-[var(--color3)] flex flex-row items-center justify-center text-[10px] font-[500] font-[Montserrat] text-[var(--white)]'>Практика</div>
        <svg className='mt-auto mb-auto ml-auto w-[24px] h-[24px]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.1054 5.28885C9.43482 4.95952 9.95604 4.93831 10.3095 5.22635L10.3779 5.28885L15.3466 10.2566C15.5341 10.4441 15.7139 10.6229 15.8515 10.7849C15.9958 10.955 16.1459 11.1654 16.2343 11.4373C16.3583 11.8189 16.3583 12.2305 16.2343 12.6121L16.1572 12.8045C16.0708 12.9863 15.9597 13.1369 15.8515 13.2644C15.7139 13.4265 15.5341 13.6053 15.3466 13.7928L10.3779 18.7615C10.0264 19.1126 9.45679 19.1127 9.1054 18.7615C8.75393 18.41 8.75393 17.8395 9.1054 17.4881L14.0742 12.5193C14.2824 12.3111 14.4005 12.1924 14.4794 12.0994C14.5031 12.0714 14.5173 12.0522 14.5253 12.0408C14.527 12.0304 14.5269 12.02 14.5253 12.0096C14.5174 11.9983 14.5036 11.9785 14.4794 11.95C14.4005 11.857 14.2825 11.7384 14.0742 11.5301L9.1054 6.56131L9.04388 6.49296C8.75542 6.13952 8.77601 5.61844 9.1054 5.28885Z" fill="#003A73" />
        </svg>
      </div>

      {isOpen && (
        <div className='top-0 left-0 absolute w-full h-full bg-[#F3F3F3] flex flex-col py-[15px] px-[30px] gap-y-[30px]'>
          <div className='w-full items-center flex flex-row gap-x-[10px]'>
            <svg className='w-[32px] h-[32px]' viewBox="0 0 32 32" fill='none' xmlns="http://www.w3.org/2000/svg">
              <path d="M16 29.3333C23.3638 29.3333 29.3334 23.3638 29.3334 16C29.3334 8.63616 23.3638 2.66663 16 2.66663C8.63622 2.66663 2.66669 8.63616 2.66669 16C2.66669 23.3638 8.63622 29.3333 16 29.3333Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 18.6667C17.4727 18.6667 18.6666 17.4728 18.6666 16C18.6666 14.5273 17.4727 13.3334 16 13.3334C14.5272 13.3334 13.3333 14.5273 13.3333 16C13.3333 17.4728 14.5272 18.6667 16 18.6667Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className='font-[700] text-[18px] font-[Montserrat] text-[var(--black)]'>Информация о паре</span>
            <svg onClick={show} className='ml-auto w-[24px] h-[24px]' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.31083 0L0 4.31083L2.20127 6.5121L7.64331 12.0459L2.20127 17.4879L0 19.5975L4.31083 24L6.5121 21.7987L12.0459 16.265L17.4879 21.7987L19.5975 24L24 19.5975L21.7987 17.4879L16.265 12.0459L21.7987 6.5121L24 4.31083L19.5975 0L17.4879 2.20127L12.0459 7.64331L6.5121 2.20127L4.31083 0Z" fill="black" />
            </svg>
          </div>
          <div className='w-full flex flex-col gap-y-[4px] px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Название</span>
            <p className='font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'>Линейная алгребра</p>
          </div>
          <div className='w-full flex flex-col px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Заметка к задаче</span>
            <textarea placeholder='Написать заметку' className='outline-none placeholder:font-[400] placeholder:text-[18px] placeholder:font-[Montserrat] placeholder:text-[var(--black)] font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'></textarea>
          </div>
          <div className='w-full flex flex-col px-[15px] py-[8px] rounded-[12px] border-[1px] border-[#000]'>
            <span className='font-[400] text-[12px] font-[Unbounded] text-[var(--black)] opacity-[0.5]'>Заметка к задаче (увидят все одногруппники)</span>
            <textarea placeholder='Написать заметку' className='outline-none placeholder:font-[400] placeholder:text-[18px] placeholder:font-[Montserrat] placeholder:text-[var(--black)] font-[400] text-[18px] font-[Montserrat] text-[var(--black)]'></textarea>
          </div>
          <span className='font-[400] text-[9px] font-[Unbounded] text-[#9CA3AF] mt-[-30px]'>Добавил(-а) Халитов Аяз(@norrthh)</span>
          <div className='flex flex-row items-center py-[8px] px-[16px] rounded-[12px] border-[1px] border-[#000] justify-between'>
            <div className='flex flex-col items-start'>
              <span className='font-[500] text-[12px] font-[Inter] text-[var(--black)]'>Начало</span>
              <span className='font-[700] text-[24px] font-[Inter] text-[var(--black)]'>12:00</span>
            </div>
            <svg className='w-[40px] h-[40px]' viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.8354 9.20691L25.7195 20.7931L14.8354 32.3793" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className='flex flex-col items-start'>
              <span className='font-[500] text-[12px] font-[Inter] text-[var(--black)]'>Конец</span>
              <span className='font-[700] text-[24px] font-[Inter] text-[var(--black)]'>14:00</span>
            </div>
          </div>
          <div className='flex flex-row items-center justify-between w-full'>
            <span className='font-[400] text-[17px] font-[Unbounded] text-[#111827]'>Напомнить</span>
            <button
              onClick={toggle}
              className={`w-[48px] h-[27px] flex items-center bg-[#004C97] rounded-full p-1 cursor-pointer transition-colors duration-300 ${isOn ? 'bg-[#fff]' : 'bg-[#004C97]'
                }`}
            >
              <div
                className={`w-[23px] h-[23px] rounded-full shadow-md transform transition-transform duration-300 ${isOn ? 'translate-x-6 bg-[#004C97]' : 'translate-x-[-1px] bg-white'
                  }`}
              />
            </button>
          </div>
          <button className='mx-auto w-[160px] h-[48px] bg-[#00539F] flex items-center justify-center rounded-[20px] font-[600] text-[15px] font-[Montserrat] text-[var(--white)]'>Сохранить</button>
        </div>)}
    </>
  );
};