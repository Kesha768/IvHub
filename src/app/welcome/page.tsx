import React from 'react';
import Image from 'next/image';

const WelPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center w-full mt-[51] mb-[47]'>
      <Image
        src="/main-logo.png"
        alt="Синий логотип КФУ, на котором изображен Зилант"
        width={269} 
        height={269} 
      />
      <p className='font-bold text-[24px] leading-[100%] font-[Montserrat] text-[var(--color8)] max-w-[277px] text-center mt-[27]'>Добро пожаловать в<span className='text-[var(--color3)]'>&nbsp;IVHub</span>!</p>
      <p className='text-[var(--black)] font-medium text-[13px] leading-[100%] tracking-0 text-center font-[Montserrat] text-[var(--color9)] max-w-[249px] mt-[46]'>Давай установим некоторые настройки и начнём твоё путешествие.</p>
      <a href='../registration' className='w-full bg-[#00539F] flex flex-col items-center h-[48] mt-[46] justify-center rounded-[15] font-semibold text-[15px] leading-[15px] text-center font-[Montserrat] text-[var(--white)] max-w-[300]'>Дальше</a>  
    </div>
  );
};

export default WelPage;