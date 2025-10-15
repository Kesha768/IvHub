"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDay } from 'date-fns';

interface Props {
className?: string;
}

interface DateInfo {
  number: number;
  weekday: string;
  month: number;
}

interface DatesObject {
  [key: string]: DateInfo;
}

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function generateDates(): DatesObject {
  const today = new Date();
  const dates: DatesObject = {};

  for (let i = 0; i < 6; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const dayIndex = date.getDay();
    const weekday = weekdays[(dayIndex + 6) % 7];
    const month = date.getMonth() + 1;
    dates[`date${i}`] = {
      number: date.getDate(),
      weekday: weekday,
      month: month,
    };
  }

  return dates;
}

export const Calendar: React.FC<Props> = ({ className }) => {
const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const dates = generateDates();

const formatDate = (date: Date): DateInfo => {
  const number = date.getDate();
  const weekday = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][date.getDay()];
  const month = date.getMonth() + 1;
  return { number, weekday, month };
};

const urlChange = (dateKey: string) => {
  const { number, month } = dates[dateKey];
  const newDateString = `${number}_${month}`;
  
  const url = new URL(window.location.href);
  url.searchParams.set('date', newDateString);
  window.history.pushState({}, '', url.toString());
};

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowCalendar(false);
    if (date) {
      const formattedDate = formatDate(date);
      const newDateString = `${formattedDate.number}_${formattedDate.month}`;
      const url = new URL(window.location.href);
      url.searchParams.set('date', newDateString);
      window.history.pushState({}, '', url.toString());
    }
  };


  return (
    <>
    <div className='grid grid-cols-7 justify-between gap-x-[17px] items-center'>
        {Object.entries(dates).map(([key, { number, weekday }]) => (
          <div onClick={() => urlChange(key)} key={key} className="py-[12px] px-[10px] rounded-[12px] bg-[#E6F0FA] border-[1px] border-[#004C97] w-auto h-[90px] flex flex-col gap-y-[3px] items-center">
        <span className='text-[18px] font-[600] font-[Inter] text-[#131313]'>{number}</span>
        <span className='text-[12px] font-[400] font-[Inter] text-[#131313]'>{weekday}</span>
        <div className='flex flex-row items-center gap-x-[3px]'>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color3)]'></div>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color11)]'></div>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color14)]'></div>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color4)]'></div>
        </div>
    </div>
      ))}

     {!selectedDate && ( <div onClick={() => setShowCalendar(true)} className="py-[12px] px-[10px] rounded-[12px] bg-[#E6F0FA] border-[1px] border-[#004C97] w-auto h-[64px] flex flex-col gap-y-[0px] items-center cursor-pointer">
                    <span className='text-[14px] font-[600] font-[Inter] text-[#131313]'>Иная</span>
                    <span className='text-[12px] font-[400] font-[Inter] text-[#131313]'>Дата</span>
                </div> )}

                {showCalendar && (
                    <div className='absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            inline
                        />
                    </div>
                )}

                {selectedDate && (
                    <div onClick={() => setShowCalendar(true)} className="py-[12px] px-[10px] rounded-[12px] bg-[#E6F0FA] border-[1px] border-[#004C97] w-auto h-[90px] flex flex-col gap-y-[3px] items-center">
                        {(() => {
                            const { number, weekday } = formatDate(selectedDate);
                            return (
                                <>
                                    <span className='text-[18px] font-[600] font-[Inter] text-[#131313]'>{number}</span>
                                    <span className='text-[12px] font-[400] font-[Inter] text-[#131313]'>{weekday}</span>
                                    <div className='flex flex-row items-center gap-x-[3px]'>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color3)]'></div>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color11)]'></div>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color14)]'></div>
            <div className='w-[6px] h-[6px] rounded-[50%] bg-[var(--color4)]'></div>
        </div>
                                </>
                            );
                        })()}
                    </div>
                )}
    </div>

    </>
  );
};